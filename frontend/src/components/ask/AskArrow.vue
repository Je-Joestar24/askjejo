<template>
    <div @click="toggleArrow" class="app__arrow-toggle">
        <svg v-if="state.arrow" class="app__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 15 12 9 18 15" />
        </svg>
        <svg v-else class="app__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';


const store = useStore()
const state = store.state.ask;
const toggleArrow = () => {
    store.commit('ask/toggleArrow')
}
</script>