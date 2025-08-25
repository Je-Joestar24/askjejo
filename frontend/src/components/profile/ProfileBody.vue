<template>
    <form @submit.prevent="updateUser" class="profile-form">
        <Email />
        <Username />
        <ChangePassword />
        <Cta />
    </form>
</template>

<script setup>
import { useStore } from 'vuex'
import Email from './Email.vue'
import Username from './Username.vue'
import ChangePassword from './ChangePassword.vue'
import Cta from './Cta.vue'

const store = useStore()
const state = store.state.profile

const togglePasswordChange = () => {
    store.dispatch('togglePasswordChange')
}
const user = JSON.parse(localStorage.getItem('user'))

const updateUser = () => {
    store.dispatch('updateUser', { id: user?.id, email: state.profileData.email, name: state.profileData.name })
}
</script>