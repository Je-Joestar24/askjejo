<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    /**
     * Display a listing of the user's chats.
     */
    public function index(Request $request)
    {
        try {
            $userId = $request->user()->id;
            
            $chats = Chat::where('user_id', $userId)
                ->with(['messages' => function ($query) {
                    $query->latest()->limit(1);
                }])
                ->latest()
                ->get();

            return ChatResource::collection($chats);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch chats.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Display the specified chat with its message history.
     */
    public function show(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:chats,id'],
            ]);

            $userId = $request->user()->id;
            
            $chat = Chat::where('id', $id)
                ->where('user_id', $userId)
                ->with('messages')
                ->first();

            if (!$chat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chat not found or access denied.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'chat' => new ChatResource($chat),
                'messages' => MessageResource::collection($chat->messages),
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch chat.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }

}
