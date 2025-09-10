<template>
    <!-- Profile Header -->
    <div class="profile-header">
        <div class="avatar-section">
            <div class="avatar-circle">
                <svg class="user-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </div>
        </div>

        <div class="profile-actions">
            <button @click.prevent="toggleEdit()" class="edit-btn" :class="{ 'active': state.isEditing }"
                :aria-label="state.isEditing ? 'Cancel editing' : 'Edit profile'">
                <svg v-if="!state.isEditing" class="edit-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                <svg v-else class="close-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                {{ state.isEditing ? 'Cancel' : 'Edit' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile

const toggleEdit = () => {
  store.dispatch('profile/toggleEdit')
}
</script>