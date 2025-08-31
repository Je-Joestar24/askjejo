<template>
    <section class="ask__messages" aria-label="Message history" role="log">
        <div v-if="state.messages.length > 0" v-for="(msg, _) in state.messages" class="ask__message "
            :class="{ 'ask__message--user': (msg.sender == 'user'), 'ask__message--assistant': (msg.sender == 'bot') }"
            aria-label="User message">
            <div v-if="msg.sender == 'bot'" class="ask__avatar" aria-hidden="true">A</div>
            <div class="ask__bubble">
                <p v-html="parsedContent(msg.content)" class="ask__text"></p>
                <span class="ask__meta" aria-label="Sent time">{{ formatTime(msg.created_at) }}</span>
            </div>
            <div v-if="msg.sender == 'user'" class="ask__avatar" aria-hidden="true">U</div>
        </div>

        <!-- New Chat Welcome Display -->
        <div v-else class="ask__new-chat-welcome">
            <AskAreaNewChat />
        </div>
        <div v-if="state.loading" class="ask__message ask__message--assistant" aria-label="Bot message">
            <div class="ask__avatar" aria-hidden="true">A</div>
            <div class="ask__bubble">
                <p class="ask__text">Please wait generating response...</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { marked } from 'marked';
import AskAreaNewChat from './AskAreaNewChat.vue';

const parsedContent = (param) => {
    return marked.parse(param.replace(/\\n/g, '\n').replace(/\\t/g, '    '))
}

const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}



const state = useStore().state.ask;
</script>