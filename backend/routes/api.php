<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/test', function () {
    return response()->json([
        'laravel_version' => app()->version(),
    ]);
});

