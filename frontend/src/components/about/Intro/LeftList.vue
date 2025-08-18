<template>
    <ul class="intro__list" role="list" aria-label="Highlights">
        <LeftListItem :payload="{title: 'Real‑time responses powered by Groq inference'}"/>
        <LeftListItem :payload="{title: 'Clean, accessible UI with keyboard‑first navigation'}"/>
        <LeftListItem :payload="{title: 'Private by default with export‑friendly history'}"/>
    </ul>
</template>

<script setup>
import LeftListItem from './LeftListItem.vue';


</script>