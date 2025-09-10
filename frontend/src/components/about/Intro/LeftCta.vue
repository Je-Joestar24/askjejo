<template>
    <div class="intro__cta" role="group" aria-label="Primary actions">
        <button @click.prevent="store.commit('setActiveModal', 'signup')" class="intro__btn intro__btn--primary" href="#" role="button" aria-label="Start chatting with AskJejo">
            Start chatting
        </button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>