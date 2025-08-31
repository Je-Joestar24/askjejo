<template>
    <header class="ask__sidebar-header">
        <h2 class="ask__sidebar-title" aria-label="Chats">Chats</h2>
        <button class="ask__new-chat" aria-label="Start new chat" @click.prevent="newChats">+ New</button>
    </header>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()
const newChats = () => store.dispatch('resetChats')
</script>