<script setup>
import { RouterView } from 'vue-router'
import { useStore } from 'vuex';
import Navigation from './components/header/Navigation.vue';
import FooterV from './components/footer/Footer.vue';
import Modals from './components/modals/Modals.vue';
import Loading from './composables/loading/Loading.vue';
import { onMounted } from 'vue';
import Notification from './components/notif/Notification.vue';

const store = useStore()
const state = store.state
onMounted(() => { store.dispatch('initialize') })
</script>

<template>
  <Navigation />
  <RouterView />
  <FooterV />
  <Modals />
  <Loading :show="state.loading" />
  <Notification/>
</template>
