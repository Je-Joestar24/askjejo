<template>
    <LoginModal v-if="store.state.activeModal == 'login'"/> 
    <SignupModal v-if="store.state.activeModal == 'signup'"/>   
</template>

<script setup>
import LoginModal from './login/LoginModal.vue';
import { useStore } from 'vuex'
import SignupModal from './signup/SignupModal.vue';

const store = useStore()
</script>