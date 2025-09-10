<template>
    <footer class="ask__sidebar-footer" aria-label="Sidebar actions">
        <RouterLink to="/profile" class="ask__sidebar-btn" style="text-align: center;" aria-label="Settings">Profile</RouterLink>
        <button class="ask__sidebar-btn" aria-label="Logout" @click.prevent="logoutUser">Logout</button>
    </footer>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useStore } from 'vuex'

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