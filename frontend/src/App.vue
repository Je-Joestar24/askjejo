<script setup>
import { RouterView } from 'vue-router'
import { useStore } from 'vuex';
import Navigation from './components/header/Navigation.vue';
import FooterV from './components/footer/Footer.vue';
import Modals from './components/modals/Modals.vue';
import Loading from './composables/loading/Loading.vue';

const store = useStore()
const state = store.state
</script>

<template>
  <Navigation/>
  <RouterView />
  <FooterV />
  <Modals/>
  <Loading :show="state.loading"/>
</template>
