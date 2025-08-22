<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\api\UserAuths;

// Public routes (no auth required)
Route::post('/auth/signup', [UserAuths::class, 'signup']);
Route::post('/auth/login', [UserAuths::class, 'login']);
Route::post('/auth/logout', [UserAuths::class, 'logout']);

// Test routes to verify CORS and CSRF
Route::get('/test', function () {
    return response()->json([
        'message' => 'GET request working!',
        'laravel_version' => app()->version(),
        'timestamp' => now()->toISOString(),
        'csrf_token' => csrf_token(),
    ]);
});

// Debug route to check request details
Route::post('/debug', function (Request $request) {
    // Manually start session if not already started
    if (!session()->isStarted()) {
        session()->start();
    }
    
    return response()->json([
        'message' => 'Debug route - checking request details',
        'timestamp' => now()->toISOString(),
        'method' => $request->method(),
        'url' => $request->url(),
        'headers' => $request->headers->all(),
        'cookies' => $request->cookies->all(),
        'session_id' => session()->getId(),
        'csrf_token' => csrf_token(),
        'session_started' => session()->isStarted(),
    ]);
});

Route::post('/test', function (Request $request) {
    return response()->json([
        'message' => 'POST request working! CSRF validation passed.',
        'laravel_version' => app()->version(),
        'timestamp' => now()->toISOString(),
        'csrf_token' => csrf_token(),
        'session_id' => session()->getId(),
        'headers' => $request->headers->all(),
        'cookies' => $request->cookies->all(),
    ]);
});

// Protected routes (require auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserAuths::class, 'index']);
    Route::get('/user', function () {
        return response()->json([
            'user' => Auth::user(),
            'message' => 'Authenticated user data'
        ]);
    });
});
