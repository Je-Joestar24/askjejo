<template>
  <div
    v-if="isVisible"
    class="route-message"
    :class="{ 'route-message--exit': isExiting }"
    role="status"
    aria-live="polite"
    @click="handleClose"
  >
    <div class="route-message__content">
      <span class="route-message__text">{{ displayMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const routeMessage = computed(() => store.state.routeMessage)

const isVisible = ref(false)
const isExiting = ref(false)
const displayMessage = ref('')

let clearTimer = null
let exitTimer = null

const startAutoClear = () => {
  if (clearTimer) clearTimeout(clearTimer)
  clearTimer = setTimeout(() => {
    // Clear route message after 1000ms
    store.commit('setRouteMessage')
  }, 1000)
}

const handleClose = () => {
  if (clearTimer) clearTimeout(clearTimer)
  store.commit('setRouteMessage')
}

watch(
  () => routeMessage.value,
  (newMsg) => {
    if (newMsg) {
      // Enter state
      isExiting.value = false
      isVisible.value = true
      displayMessage.value = newMsg
      startAutoClear()
    } else if (isVisible.value) {
      // Exit animation when message cleared
      isExiting.value = true
      if (exitTimer) clearTimeout(exitTimer)
      exitTimer = setTimeout(() => {
        isVisible.value = false
        isExiting.value = false
      }, 400)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (clearTimer) clearTimeout(clearTimer)
  if (exitTimer) clearTimeout(exitTimer)
})
</script>
