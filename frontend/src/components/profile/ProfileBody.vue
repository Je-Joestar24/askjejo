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
const getters = store.getters

const user = JSON.parse(localStorage.getItem('user'))

const updateUser = async () => {
    const form = { id: user?.id, email: state.profileData.email, name: state.profileData.name }
    if(getters['profile/hasPasswordChanges']){
        form['password'] = state.passwordData.currentPassword
        form['new_password'] = state.passwordData.newPassword
    }
    const response = await store.dispatch('updateUser', form)
    
    store.commit('notif/setMessage', {message: response.message, type: 'success' ? response.success : 'error'})
}
</script>