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

            return ChatResource::collection($chats)->additional(['success' => true]);
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
    public function show(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:chats,id'],
            ]);

            $userId = $request->user()->id;
            
            $chat = Chat::where('id', $request->input('id'))
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

    /**
     * Update the specified chat title.
     */
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
            ]);

            $userId = $request->user()->id;
            
            $chat = Chat::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$chat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chat not found or access denied.',
                ], 404);
            }

            $chat->update([
                'title' => $validated['title'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Chat title updated successfully.',
                'chat' => new ChatResource($chat),
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to update chat.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Remove the specified chat and all its messages.
     */
    public function destroy(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:chats,id'],
            ]);

            $userId = $request->user()->id;
            
            $chat = Chat::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$chat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chat not found or access denied.',
                ], 404);
            }

            DB::transaction(function () use ($chat) {
                // Delete all messages first (due to foreign key constraints)
                Message::where('chat_id', $chat->id)->delete();
                // Delete the chat
                $chat->delete();
            });

            return response()->json([
                'success' => true,
                'message' => 'Chat deleted successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to delete chat.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Get chat history for a specific chat.
     */
    public function history(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'id' => ['required', 'integer', 'exists:chats,id'],
                'limit' => ['nullable', 'integer', 'min:1', 'max:100'],
                'offset' => ['nullable', 'integer', 'min:0'],
            ]);

            $userId = $request->user()->id;
            $limit = $validated['limit'] ?? 50;
            $offset = $validated['offset'] ?? 0;
            
            $chat = Chat::where('id', $id)
                ->where('user_id', $userId)
                ->first();

            if (!$chat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chat not found or access denied.',
                ], 404);
            }

            $messages = Message::where('chat_id', $id)
                ->orderBy('created_at', 'asc')
                ->skip($offset)
                ->take($limit)
                ->get();

            return response()->json([
                'success' => true,
                'chat_id' => $id,
                'messages' => MessageResource::collection($messages),
                'pagination' => [
                    'limit' => $limit,
                    'offset' => $offset,
                    'total' => Message::where('chat_id', $id)->count(),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to fetch chat history.',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }
}
