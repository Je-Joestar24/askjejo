<template>
    <div class="nav__profile" tabindex="0" aria-label="Profile Menu">
        <!-- Profile SVG -->
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="10" r="5" stroke="var(--min-violet-primary)" stroke-width="2" fill="none" />
            <ellipse cx="14" cy="20" rx="7" ry="4" stroke="var(--min-violet-accent)" stroke-width="2" fill="none" />
        </svg>
        <div class="nav__profile-dropdown">
            <router-link class="nav__profile-btn" aria-label="Profile" to="/profile">Profile</router-link>
            <button class="nav__profile-btn" aria-label="Logout" @click.prevent="logoutUser">Logout</button>
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
        router.push({ name: 'home' })
    }
}
</script>