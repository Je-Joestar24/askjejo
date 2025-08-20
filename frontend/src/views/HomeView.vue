<template>
    <Hero/>
    <Features/>
    <Cta/>
</template>

<script setup>
import Hero from '@/components/home/Hero.vue';
import Features from '@/components/home/Features.vue';
import Cta from '@/components/home/Cta.vue';
import { onMounted } from 'vue';

onMounted(() => document.title = "AskJejo | Home")
</script>