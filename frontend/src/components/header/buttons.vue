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
</template>


<script setup>
import { useStore } from 'vuex'

const store = useStore()

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
}
</script>