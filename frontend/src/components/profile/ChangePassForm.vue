<template>
    <!-- Password Change Form -->
    <div v-if="notif.type != '' && state.showPasswordChange" 
         class="notification-message" 
         :class="`notification-message--${notif.type}`"
         @click.prevent="setMessage"
         role="alert"
         :aria-live="notif.type === 'error' ? 'assertive' : 'polite'">
        <div class="notification-message__icon">
            <svg v-if="notif.type === 'success'" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" fill="currentColor"/>
            </svg>
            <svg v-else-if="notif.type === 'error'" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L10 8.586 8.707 7.293z" fill="currentColor"/>
            </svg>
        </div>
        <div class="notification-message__content">
            <span class="notification-message__text">{{ notif.message }}</span>
        </div>
        <button class="notification-message__close" 
                @click.prevent="setMessage" 
                aria-label="Close notification">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="currentColor"/>
            </svg>
        </button>
    </div>
    <div v-if="state.showPasswordChange" class="password-form">
        <div class="form-group">
            <label for="currentPassword" class="form-label">Current Password</label>
            <input v-model="state.passwordData.currentPassword" type="password" class="form-input"
                placeholder="Enter current password" aria-describedby="current-password-help" />
            <div id="current-password-help" class="form-help">Enter your current password</div>
        </div>

        <div class="form-group">
            <label for="newPassword" class="form-label">New Password</label>
            <input v-model="state.passwordData.newPassword" type="password" class="form-input"
                placeholder="Enter new password" aria-describedby="new-password-help" />
            <div id="new-password-help" class="form-help">Enter your new password</div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile
const notif = store.state.notif

const setMessage = () => {
    store.commit('setMessage')
}
</script>