<template>
    <div class="intro__meta" role="list" aria-label="Key stats">
        <LeftMetaItem v-for="(item, index) in stats" :key="index" :payload="item" />
    </div>
</template>

<script setup>
import LeftMetaItem from './LeftMetaItem.vue';

const stats = [
    { value: "150ms", label: "Median response time" },
    { value: "99.9%", label: "Uptime" },
    { value: "Secure", label: "Privacy-first" },
];
</script>