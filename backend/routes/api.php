<?php

use App\Http\Controllers\api\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\SignupUserController;

// Public routes (no auth required)
Route::post('/auth/signup', [SignupUserController::class, 'store']);
Route::post('/auth/login', [LoginController::class, 'login']);
// Protected routes (require auth)
Route::middleware('auth:sanctum')->group(function () {

    // Test routes to verify CORS and CSRF
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/authorized', function () {
        return response()->json([
            'message' => 'Authorized'
        ]);
    });
    Route::put('/profile/update', [ProfileController::class, 'update']);
});