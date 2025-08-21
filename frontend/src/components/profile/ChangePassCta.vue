<template>
    <button @click="togglePasswordChange" type="button" class="change-password-btn"
        :class="{ 'active': state.showPasswordChange }" aria-label="Change password">
        <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
        </svg>
        {{ state.showPasswordChange ? 'Cancel Password Change' : 'Change Password' }}
    </button>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile

const togglePasswordChange = () => {
    store.dispatch('togglePasswordChange')
}
</script>