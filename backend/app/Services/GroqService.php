<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GroqService
{
    public function ask($prompt)
    {
        $response = Http::withToken(env('GROQ_API_KEY'))
            ->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'meta-llama/llama-4-scout-17b-16e-instruct', // or llama3, etc.
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful AI assistant.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

        return $response->json();
    }
}