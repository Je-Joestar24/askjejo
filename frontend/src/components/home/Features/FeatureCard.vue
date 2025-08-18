<template>
  <div class="feature-card" role="article" :aria-label="title">
    <!-- Icon -->
    <div class="feature-card__icon">
      <div class="feature-card__icon-bg">
        <component :is="icon" aria-hidden="true" v-if="icon" />
        <span v-else>🔲</span> <!-- fallback -->
      </div>
    </div>

    <!-- Content -->
    <div class="feature-card__content">
      <h3 class="feature-card__title">{{ title }}</h3>
      <p class="feature-card__description">{{ description }}</p>
    </div>

    <!-- Image -->
    <div class="feature-card__image">
      <div class="feature-card__image-placeholder">
        <component :is="image" aria-hidden="true" v-if="image" />
        <span v-else>🖼️</span> <!-- fallback -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  payload: {
    type: Object,
    default: () => ({
      title: "No data",
      description: "No description available.",
      icon: null,
      image: null,
    }),
  },
});

const {title, description, icon, image} = props.payload
</script>