<template>
    <div class="intro__stat" role="listitem">
        <span class="intro__stat-value">{{ value }}</span>
        <span class="intro__stat-label">{{ label }}</span>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({
      value: "No data",
      label: "No data"
    }),
  },
});

const { value, label} = props.payload
</script>