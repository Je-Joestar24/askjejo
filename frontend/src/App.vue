<script setup>
import { RouterView, useRoute } from 'vue-router'
import { useStore } from 'vuex';
import Navigation from './components/header/Navigation.vue';
import FooterV from './components/footer/Footer.vue';
import Modals from './components/modals/Modals.vue';
import Loading from './components/loading/Loading.vue';
import { onMounted } from 'vue';
import Notification from './components/notif/Notification.vue';
import RouteMessage from './components/notif/RouteMessage.vue';

const store = useStore()
const state = store.state
const router = useRoute()
onMounted(() => { store.dispatch('initialize') })
</script>

<template>
  <Navigation/>
  <RouterView />
  <FooterV v-if="router.name != 'ask'" />
  <Modals />
  <Loading :show="state.loading" />
  <Notification />
  <RouteMessage />
</template>
