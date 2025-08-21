<template>
    <form @submit.prevent="" class="profile-form">
        <Email />
        <Username />
        <ChangePassword />
        <Cta />
    </form>
</template>

<script setup>
import { useStore } from 'vuex'
import Email from './Email.vue'
import Username from './username.vue'
import ChangePassword from './ChangePassword.vue'
import Cta from './Cta.vue'

const store = useStore()
const state = store.state.profile

const togglePasswordChange = () => {
    store.dispatch('togglePasswordChange')
}
</script>