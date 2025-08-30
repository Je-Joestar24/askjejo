<template>
    <section class="ask__messages" aria-label="Message history" role="log">

        
        <div v-for="(msg, _) in state.messages" class="ask__message " :class="{'ask__message--user': (msg.sender == 'user'), 'ask__message--assistant': (msg.sender == 'bot')}" aria-label="User message">
            <div v-if="msg.sender == 'bot'" class="ask__avatar" aria-hidden="true">U</div>
            <div class="ask__bubble">
                <p class="ask__text">{{ msg.message }}</p>
                <span class="ask__meta" aria-label="Sent time">{{ msg.datetime }}</span>
            </div>
            <div v-if="msg.sender == 'user'" class="ask__avatar" aria-hidden="true">U</div>
        </div>
    </section>
</template>
<script setup>
import { useStore } from 'vuex';

const state = useStore().state.ask
</script>