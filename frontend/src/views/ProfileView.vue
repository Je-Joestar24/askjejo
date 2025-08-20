<template>
    <div class="profile-container">
        <MainDisplay />
    </div>
</template>

<script setup>
import MainDisplay from '@/components/profile/MainDisplay.vue';
import { onMounted } from 'vue';

onMounted(() => document.title = "AskJejo | Profile")
</script>