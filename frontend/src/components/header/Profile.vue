<template>
    <div class="nav__profile" tabindex="0" aria-label="Profile Menu">
        <!-- Profile SVG -->
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="10" r="5" stroke="var(--theme-primary)" stroke-width="2" fill="none" />
            <ellipse cx="14" cy="20" rx="7" ry="4" stroke="var(--theme-accent)" stroke-width="2" fill="none" />
        </svg>
        <div class="nav__profile-dropdown">
            <router-link class="nav__profile-btn" aria-label="Profile" to="/profile">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 10a6 6 0 0 0-6 6v2h12v-2a6 6 0 0 0-6-6z"
                        fill="currentColor" />
                </svg>
                Profile
            </router-link>
            <button class="nav__profile-btn" aria-label="Logout" @click.prevent="logoutUser">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                        d="M8 1a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1zM3.732 4.268a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1-1.414 1.414L5.414 6H3a1 1 0 0 1 0-2h2.414L3.732 2.268a1 1 0 0 1 0-1.414z"
                        fill="currentColor" />
                </svg>
                Logout
            </button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'

const store = useStore()
const router = useRouter()

const logoutUser = async () => {
    const response = await store.dispatch('logout')
    if (response.success) {
        store.dispatch('initialize')
        store.commit('notif/setMessage', { message: response.message, type: 'success' })
        router.push({ name: 'home' })
    } else store.commit('notif/setMessage', { message: response.message, type: 'error' })

}
</script>