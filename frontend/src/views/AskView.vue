<template>
    <Ask />
</template>

<script setup>
import { onMounted } from 'vue';
import Ask from '@/components/ask/Ask.vue'

onMounted(() => document.title = "AskJejo | Ask")
</script>