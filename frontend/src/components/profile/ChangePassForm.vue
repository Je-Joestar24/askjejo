<template>
    
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
</script>