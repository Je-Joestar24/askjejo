<template>
    <main class="ask__chat" aria-label="Chat area">
        <AskAreaHeader />
        <AskAreaMessages />
        <AskAreaMessage />
    </main>
</template>

<script setup>
import AskAreaHeader from './AskAreaHeader.vue';
import AskAreaMessages from './AskAreaMessages.vue';
import AskAreaMessage from './AskAreaMessage.vue';
</script>