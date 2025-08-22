<template>
  <div
    v-if="show"
    class="loading"
    role="dialog"
    aria-modal="true"
    :aria-label="ariaLabel"
    aria-live="polite"
    aria-busy="true"
  >
    <div class="loading__backdrop" aria-hidden="true"></div>
    <div class="loading__dialog" role="document">
      <div class="loading__icon" aria-hidden="true">
        <!-- Circular rotating ring spinner -->
        <div class="loading__spinner">
          <svg class="loading__ring" width="80" height="80" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <circle class="loading__path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
          </svg>
        </div>
      </div>
      <p class="loading__text">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: true },
  label: { type: String, default: 'Loading…' },
  ariaLabel: { type: String, default: 'Loading, please wait' },
})
</script>