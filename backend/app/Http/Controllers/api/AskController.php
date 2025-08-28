<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\GroqService;
use Illuminate\Http\Request;

class AskController extends Controller
{
    protected $groq;

    public function __construct(GroqService $groq)
    {
        $this->groq = $groq;
    }

    public function ask(Request $request)
    {
        $prompt = $request->input('prompt', 'Hello AI, can you introduce yourself?');
        $response = $this->groq->ask($prompt);

        // return raw response for debugging
        return response()->json($response);
    }
}
