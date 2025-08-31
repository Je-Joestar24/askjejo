<template>
    <section class="ask" role="main" aria-label="Ask main chat page">
        <Sidebar/>
        <AskArea/>
    </section>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import AskArea from './AskArea.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()

const loadChats = async () => {
    store.dispatch('getChatHistory')
}

onMounted(loadChats)
</script>