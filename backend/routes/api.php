<?php

use App\Http\Controllers\api\AskController;
use App\Http\Controllers\api\ChatController;
use App\Http\Controllers\api\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\SignupUserController;

// Public routes (no auth required)
Route::post('/auth/signup', [SignupUserController::class, 'store']);
Route::post('/auth/login', [LoginController::class, 'login']);
// Protected routes (require auth)
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [LoginController::class, 'logout']);
    // Test routes to verify CORS and CSRF
    Route::get('/authorized', function () {
        return response()->json([
            'message' => 'Authorized'
        ]);
    });
    Route::put('/profile/update', [ProfileController::class, 'update']);
    Route::post('/ask', [AskController::class, 'ask']);
    /* Chats */
    Route::get('/chat/history', [ChatController::class, 'index']);
    Route::post('/chat/mesages/all', [ChatController::class, 'show']);
    Route::post('/chat/update/{id}', [ChatController::class, 'update']);
    Route::delete('/chat/delete/{id}', [ChatController::class, 'destroy']);
    Route::post('/chat/mesages/paginated', [ChatController::class, 'history']);
});
