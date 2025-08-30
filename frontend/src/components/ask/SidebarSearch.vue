<template>
    <div class="ask__sidebar-search" role="search" aria-label="Search chats">
        <input class="ask__search-input" v-model="state.search" type="text" placeholder="Search conversations"
            aria-label="Search conversations" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const state = useStore().state.ask
</script>