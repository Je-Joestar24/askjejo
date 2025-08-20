<template>
  <!-- Center nav with glow -->
  <nav class="footer__nav" aria-label="Footer navigation">
    <div class="footer__nav-glow" aria-hidden="true"></div>
    <ul class="footer__links" role="list">
      <li v-for="item in navItems" :key="item.to" class="footer__item">
        <RouterLink :to="item.to" class="footer__link">
          {{ item.label }}
        </RouterLink>
      </li>
      <li class="footer__item">
        <a href="mailto:parrillajejomar@gmail.com?subject=Hello%20Jomar&body=I%20would%20like%20to%20get%20in%20touch."
          class="footer__link">
          Contact
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' }
]
</script>