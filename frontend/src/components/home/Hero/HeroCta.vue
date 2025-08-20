<template>
    <!-- Call to Action Buttons -->
    <div class="hero__actions">
        <button @click.prevent="toggleModal('login')" class="hero__btn hero__btn--primary" aria-label="Start chatting with AI">
            <span>Start Chatting</span>
            <svg class="hero__btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <button @click.prevent="toggleModal('signup')" class="hero__btn hero__btn--secondary" aria-label="Learn more about features">
            <svg class="hero__btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 3l14 9-14 9V3z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span>Register Now</span>
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