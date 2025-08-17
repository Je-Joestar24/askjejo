<template>
    <div class="hero">
        <HeroElements/>
        <div class="hero__container">
            <HeroContent/>
            <HeroVisuals/>
        </div>
    </div>
</template>

<script setup>
import HeroContent from '@/components/home/Hero/HeroContent.vue';
import HeroVisuals from '@/components/home/Hero/HeroVisuals.vue';
import HeroElements from '@/components/home/Hero/HeroElements.vue';
import { onMounted } from 'vue'

const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, { threshold: 0.1 })

  const animatedElements = document.querySelectorAll(
    '.hero__title, .hero__tagline, .hero__description, .hero__actions, .hero__visual, .hero__features'
  )
  animatedElements.forEach(el => observer.observe(el))
}

onMounted(() => {
  initAnimations()
})
</script>