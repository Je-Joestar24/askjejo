<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
    ];

    /**
     * A chat belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A chat has many messages.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
