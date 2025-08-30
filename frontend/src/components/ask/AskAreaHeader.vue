<template>
    <header class="ask__chat-header" aria-label="Chat header">
        <div class="ask__chat-title-group">
            <h1 class="ask__chat-title" aria-label="Current conversation title">{{ state.activeChat.title ? state.activeChat.title: 'New Message' }}</h1>
        </div>
        <div v-if="state.activeChat.title" class="ask__chat-actions">
            <button class="ask__chat-action" aria-label="Rename chat">Rename</button>
            <button class="ask__chat-action danger" aria-label="Delete chat">Delete</button>
        </div>
    </header>
</template>
<script setup>
import { useStore } from 'vuex';

const state = useStore().state.ask
</script>