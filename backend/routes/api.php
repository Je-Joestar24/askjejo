<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserAuths;

Route::post('/auth/signup', [UserAuths::class, 'signup']);

Route::post('/test', function () {
    return response()->json([
        'laravel_version' => app()->version(),
    ]);
});