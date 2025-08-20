<template>
    <LoginModal v-if="store.state.activeModal == 'login'"/>    
</template>

<script setup>
import LoginModal from './login/LoginModal.vue';
import { useStore } from 'vuex'

const store = useStore()
</script>