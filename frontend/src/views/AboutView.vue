<template>
    <Intro/>
    <MissionVision/>
</template>

<script setup>
import Intro from '@/components/about/Intro.vue';
import MissionVision from '@/components/about/MissionVision.vue';
import { onMounted } from 'vue';

onMounted(() => document.title = "AskJejo | About")
</script>