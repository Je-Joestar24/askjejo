<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Resources\UserResource;

class LoginController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        [$user, $token] = $this->authService->authenticate($validated);

        if (! $user) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        return response()->json([
            'message'      => 'Login successful.',
            'auth_type'    => 'session',
            'user'         => new UserResource($user),
        ]);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());
        return response()->json(['message' => 'Logged out successfully.']);
    }
}
