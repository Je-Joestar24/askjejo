<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'user_id',
        'sender',
        'content',
    ];

    /**
     * A message belongs to a chat.
     */
    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

    /**
     * A message may belong to a user (nullable if bot).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
