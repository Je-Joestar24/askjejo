<template>
  <div
    v-if="isVisible"
    class="notif"
    :class="[
      `notif--${displayType}`,
      positionClass,
      { 'notif--exit': isExiting }
    ]"
    role="alert"
    :aria-live="displayType === 'error' ? 'assertive' : 'polite'"
    @click="handleClose"
  >
    <div class="notif__icon" aria-hidden="true">
      <svg v-if="displayType === 'success'" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" fill="currentColor"/>
      </svg>
      <svg v-else-if="displayType === 'error'" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L10 8.586 8.707 7.293z" fill="currentColor"/>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-11a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1zm0 8a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 10 15z" fill="currentColor"/>
      </svg>
    </div>
    <div class="notif__content">
      <span class="notif__text">{{ displayMessage }}</span>
    </div>
    <button class="notif__close" aria-label="Close notification" @click.stop="handleClose">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="currentColor"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  position: {
    type: String,
    default: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  }
})

const store = useStore()
const notif = computed(() => store.state.notif)

const isVisible = ref(false)
const isExiting = ref(false)
const displayMessage = ref('')
const displayType = ref('info')

let clearTimer = null
let exitTimer = null

const positionClass = computed(() => `notif--${props.position}`)

const startAutoClear = () => {
  if (clearTimer) clearTimeout(clearTimer)
  clearTimer = setTimeout(() => {
    // Clear store after 500ms as requested
    store.commit('notif/setMessage')
  }, 1000)
}

const handleClose = () => {
  if (clearTimer) clearTimeout(clearTimer)
  store.commit('notif/setMessage')
}

watch(
  () => notif.value.message,
  (newMsg) => {
    if (newMsg) {
      // Enter state
      isExiting.value = false
      isVisible.value = true
      displayMessage.value = newMsg
      displayType.value = notif.value.type || 'info'
      startAutoClear()
    } else if (isVisible.value) {
      // Exit animation when message cleared
      isExiting.value = true
      if (exitTimer) clearTimeout(exitTimer)
      exitTimer = setTimeout(() => {
        isVisible.value = false
        isExiting.value = false
      }, 1000)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (clearTimer) clearTimeout(clearTimer)
  if (exitTimer) clearTimeout(exitTimer)
})
</script>