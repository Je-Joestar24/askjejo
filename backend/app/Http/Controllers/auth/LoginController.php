<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

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

        // 👇 Persist the login to the session
        Auth::login($user);

        return response()->json([
            'success'      => true,
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
