<template>
    <nav class="ask__conversations" aria-label="Conversation list">
        <ul class="ask__conversation-list" role="list">
            <li v-if="state.chats.length > 0" v-for="(chat, _) in state.chats" :key="_"
                class="ask__conversation-item" :class="chat?.id == state.activeChat.id ? 'active' : ''"
                role="listitem" tabindex="0" aria-label="Conversation: Fast Language Models">
                <span class="ask__conversation-title">{{ chat.title }}</span>
            </li>
            <li v-else role="listitem" tabindex="0" style="text-align: center;"
                aria-label="Conversation: Empty">
                No conversations found.
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { useStore } from 'vuex';

const state = useStore().state.ask
</script>