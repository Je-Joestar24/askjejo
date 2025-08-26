<template>
    <!-- Action buttons -->
    <div class="header__actions">
        <button @click.prevent="toggleModal('login')" class="header__btn header__btn--secondary" role="button">
            Login
        </button>
        <button @click.prevent="toggleModal('signup')" class="header__btn header__btn--primary" role="button">
            Sign Up
        </button>
    </div>

    <!-- Mobile menu toggle (hidden on desktop) -->
    <button class="header__mobile-toggle" aria-label="Toggle mobile menu" aria-expanded="false"
        aria-controls="mobile-menu">
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
        <span class="header__mobile-toggle-line"></span>
    </button>
</template>


<script setup>
import { useStore } from 'vuex'

const store = useStore()

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
}
</script>