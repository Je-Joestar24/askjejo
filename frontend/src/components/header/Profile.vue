<template>

</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

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