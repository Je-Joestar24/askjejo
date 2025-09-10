<template>
    <!-- Mobile menu toggle -->
    <button @click.prevent="toggleNav" class="header__mobile-toggle" aria-label="Toggle mobile menu"
        :aria-expanded="openNav.toString()" aria-controls="mobile-menu">
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
    </button>

    <!-- Mobile navigation drawer -->
    <MobileNavItems id="mobile-menu" v-model:openNav="openNav" @open-modal="toggleModal" />
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import MobileNavItems from './MobileNavItems.vue'

const openNav = ref(false)
const store = useStore()

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
    openNav.value = false
}
const toggleNav = () => (openNav.value = !openNav.value)
</script>
