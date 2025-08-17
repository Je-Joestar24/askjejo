<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        // Short-circuit preflight BEFORE hitting routing/middleware stack
        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204, $this->buildHeaders($request));
        }

        /** @var Response $response */
        $response = $next($request);

        // Add/merge headers on actual response
        foreach ($this->buildHeaders($request) as $name => $value) {
            if ($value === null || $value === '') {
                continue;
            }
            $response->headers->set($name, $value, false); // don't wipe other values
        }

        return $response;
    }

    protected function buildHeaders(Request $request): array
    {
        $allowedOrigins = $this->csv(env('CORS_ALLOWED_ORIGINS', '*'));
        $allowCreds     = filter_var(env('CORS_ALLOW_CREDENTIALS', false), FILTER_VALIDATE_BOOL);

        $originHeader   = $request->headers->get('Origin');
        $originToAllow  = null;

        // Decide which Origin to allow
        if ($originHeader) {
            $hasWildcard = in_array('*', $allowedOrigins, true);
            if ($hasWildcard && !$allowCreds) {
                $originToAllow = '*';
            } elseif ($this->originAllowed($originHeader, $allowedOrigins)) {
                // Reflect the requesting origin if it's allowed (needed when credentials=true)
                $originToAllow = $originHeader;
            }
        } elseif (in_array('*', $allowedOrigins, true) && !$allowCreds) {
            $originToAllow = '*';
        }

        // Methods
        $allowedMethods = $this->flat(env('CORS_ALLOWED_METHODS', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'));

        // Headers: echo back requested headers when using '*'
        $configuredAllowedHeaders = env('CORS_ALLOWED_HEADERS', '*');
        $requestedHeaders         = $request->headers->get('Access-Control-Request-Headers');
        $allowedHeaders           = ($configuredAllowedHeaders === '*')
            ? ($requestedHeaders ?: '*')
            : $this->flat($configuredAllowedHeaders);

        $exposed = $this->flat(env('CORS_EXPOSED_HEADERS', ''));
        $maxAge  = trim((string) env('CORS_MAX_AGE', '86400'));

        $headers = [
            'Access-Control-Allow-Origin'      => $originToAllow,
            'Access-Control-Allow-Methods'     => $allowedMethods,
            'Access-Control-Allow-Headers'     => $allowedHeaders,
            'Access-Control-Max-Age'           => $maxAge,
            'Access-Control-Allow-Credentials' => $allowCreds ? 'true' : null, // only set when true
            'Access-Control-Expose-Headers'    => $exposed ?: null,
            'Vary'                             => 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
        ];

        // Remove null/empty values
        return array_filter($headers, fn ($v) => $v !== null && $v !== '');
    }

    protected function csv(string $value): array
    {
        return array_values(array_filter(array_map('trim', explode(',', $value)), fn ($v) => $v !== ''));
    }

    protected function flat(string $value): string
    {
        return implode(', ', $this->csv($value));
    }

    protected function originAllowed(string $origin, array $allowed): bool
    {
        foreach ($allowed as $pattern) {
            if ($pattern === '*') {
                return true;
            }
            if ($this->matchesWildcard($origin, $pattern)) {
                return true;
            }
            if (strcasecmp($origin, $pattern) === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Supports patterns like:
     *   https://*.example.com
     *   http://*.local.test:*
     * where * can match a subdomain segment and/or port.
     */
    protected function matchesWildcard(string $origin, string $pattern): bool
    {
        // Escape regex special chars except *
        $regex = preg_quote($pattern, '/');
        // Convert \* to .*
        $regex = str_replace('\*', '.*', $regex);
        // Anchor the regex
        $regex = '/^' . $regex . '$/i';
        return (bool) preg_match($regex, $origin);
    }
}
