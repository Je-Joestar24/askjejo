<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\GroqService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Chat;
use App\Models\Message;

class AskController extends Controller
{
    protected $groq;

    public function __construct(GroqService $groq)
    {
        $this->groq = $groq;
    }

    public function ask(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string'],
            'chat_id' => ['nullable', 'integer', 'exists:chats,id'],
            'title' => ['nullable', 'string', 'max:255'],
        ]);

        $userId = $request->user()->id; // nullable for now

        try {
            $result = DB::transaction(function () use ($validated, $userId) {
                // Find or create chat
                if (!empty($validated['chat_id'])) {
                    $chat = Chat::query()
                        ->when($userId, fn($q) => $q->where('user_id', $userId))
                        ->findOrFail($validated['chat_id']);
                } else {
                    $chat = Chat::create([
                        'user_id' => $userId,
                        'title' => $validated['title'] ?? mb_strimwidth($validated['message'], 0, 60, '…'),
                    ]);
                }

                // Store user message
                $userMessage = Message::create([
                    'chat_id' => $chat->id,
                    'user_id' => $userId,
                    'sender' => 'user',
                    'content' => $validated['message'],
                ]);

                // Get AI response
                $aiRaw = $this->groq->ask($validated['message']);
                $botContent = data_get($aiRaw, 'choices.0.message.content')
                    ?? 'Sorry, I could not generate a response at this time.';

                // Store bot message
                $botMessage = Message::create([
                    'chat_id' => $chat->id,
                    'user_id' => null,
                    'sender' => 'bot',
                    'content' => $botContent,
                ]);

                return [
                    'success' => true,
                    'chat_id' => $chat->id,
                    'messages' => [
                        'user' => [
                            'id' => $userMessage->id,
                            'content' => $userMessage->content,
                            'created_at' => $userMessage->created_at,
                        ],
                        'bot' => [
                            'id' => $botMessage->id,
                            'content' => $botMessage->content,
                            'created_at' => $botMessage->created_at,
                        ],
                    ],
                ];
            });

            return response()->json($result, 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to process your request right now.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 422);
        }
    }
}
