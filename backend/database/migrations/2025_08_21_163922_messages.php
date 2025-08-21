<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('chat_id')
                  ->constrained()
                  ->onDelete('cascade'); // FK -> chats.id
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained()
                  ->onDelete('cascade'); // FK -> users.id (nullable for bot/system)
            $table->enum('sender', ['user', 'bot'])->default('user'); // Who sent it
            $table->text('content'); // The message text
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
