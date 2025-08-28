<template>
  <header class="header" role="banner" :style="route.name == 'ask' ? 'border-bottom: none' : ''"
    aria-label="Main navigation">
    <Accent />
    <NavContents />
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Accent from './Accent.vue';
import NavContents from './NavContents.vue';
// Component logic will be added later

const route = useRoute()
</script>