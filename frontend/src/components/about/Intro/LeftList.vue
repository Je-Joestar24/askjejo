<template>
    <ul class="intro__list" role="list" aria-label="Highlights">
      <LeftListItem
        v-for="(item, index) in highlights"
        :key="index"
        :payload="item"
      />
    </ul>
  </template>
  
  <script setup>
  import LeftListItem from './LeftListItem.vue';
  
  const highlights = [
    { title: "Real-time responses powered by Groq inference" },
    { title: "Clean, accessible UI with keyboard-first navigation" },
    { title: "Private by default with export-friendly history" },
  ];
  </script>
  