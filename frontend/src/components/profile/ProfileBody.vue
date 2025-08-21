<template>
    <form @submit.prevent="" class="profile-form">
        <Email />
        <Username />
        <!-- Change Password Section -->
        <div class="password-section" v-show="state.isEditing">
            <button @click="togglePasswordChange" type="button" class="change-password-btn"
                :class="{ 'active': state.showPasswordChange }" aria-label="Change password">
                <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
                </svg>
                {{ state.showPasswordChange ? 'Cancel Password Change' : 'Change Password' }}
            </button>

            <!-- Password Change Form -->
            <div v-if="state.showPasswordChange" class="password-form">
                <div class="form-group">
                    <label for="currentPassword" class="form-label">Current Password</label>
                    <input id="currentPassword" type="password" class="form-input" placeholder="Enter current password"
                        aria-describedby="current-password-help" />
                    <div id="current-password-help" class="form-help">Enter your current password</div>
                </div>

                <div class="form-group">
                    <label for="newPassword" class="form-label">New Password</label>
                    <input id="newPassword" type="password" class="form-input" placeholder="Enter new password"
                        aria-describedby="new-password-help" />
                    <div id="new-password-help" class="form-help">Enter your new password</div>
                </div>
            </div>
        </div>
        <div class="form-actions" v-if="state.isEditing">
            <button type="button" @click="" class="btn btn-secondary" aria-label="Cancel changes">
                Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="!false" aria-label="Save profile changes">
                <svg class="save-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                </svg>
                Save Changes
            </button>
        </div>
    </form>
</template>

<script setup>
import { useStore } from 'vuex'
import Email from './Email.vue'
import Username from './username.vue'

const store = useStore()
const state = store.state.profile

const togglePasswordChange = () => {
    store.dispatch('togglePasswordChange')
}
</script>