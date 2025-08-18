<template>
    <li class="intro__list-item">
        <span class="intro__list-icon" aria-hidden="true">
            <ListItemIcon/>
        </span>
        {{ title }}
    </li>
</template>
<script setup>
import ListItemIcon from "@/components/icons/about/ListItemIcon.vue";
import { defineProps } from "vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({
      title: "No data"
    }),
  },
});

const { title } = props.payload
</script>