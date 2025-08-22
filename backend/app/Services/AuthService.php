<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Authenticate user with email and password
     *
     * @param array $credentials
     * @return array|null [user, token] or null if authentication fails
     */
    public function authenticate(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            // For session-based auth, we don't need tokens
            // Just return the user and a success indicator
            return [$user, 'session'];
        }
        
        return null;
    }

    /**
     * Logout user and clear session
     *
     * @param User $user
     * @return void
     */
    public function logout(User $user)
    {
        // For session-based auth, just logout and clear session
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }

    /**
     * Get current authenticated user
     *
     * @return User|null
     */
    public function getCurrentUser()
    {
        return Auth::user();
    }
}
