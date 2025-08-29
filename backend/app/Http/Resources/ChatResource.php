<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'message_count' => $this->whenLoaded('messages', function () {
                return $this->messages->count();
            }),
            'last_message' => $this->whenLoaded('messages', function () {
                return $this->messages->last() ? [
                    'content' => $this->messages->last()->content,
                    'sender' => $this->messages->last()->sender,
                    'created_at' => $this->messages->last()->created_at,
                ] : null;
            }),
        ];
    }
}
