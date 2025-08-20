<template>
    <!-- Call to Action Buttons -->
    <div class="cta__actions">
        <button @click.prevent="toggleModal('signup')" class="cta__btn cta__btn--primary" aria-label="Sign up for free AI chatbot access">
            <div class="cta__btn-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <span>Sign up for free</span>
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