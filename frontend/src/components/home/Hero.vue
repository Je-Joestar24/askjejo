<template>
  <section class="hero" role="banner" aria-label="AI Chatbot Hero Section">
    <HeroBackground />
    <!-- Main Content -->
    <HeroMainContent />
    <!-- Feature Highlights -->
     <HeroFeatures/>
  </section>
</template>
<script setup>
import HeroBackground from './HeroBackground.vue'
import HeroMainContent from './HeroMainContent.vue'
import HeroFeatures from './HeroFeatures.vue'

import { onMounted } from 'vue'

function initAnimations() {
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


<style>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, var(--theme-bg) 0%, var(--theme-primary) 100%);
  overflow: hidden;
  padding: 2rem 0;
}


@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}


@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }

  from {
    opacity: 0;
    transform: translateX(30px);
  }
}

@keyframes chatBubbleIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.hero__features {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 2s forwards;
}

@media (max-width: 768px) {
  .hero {
    padding: 1rem 0;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .hero {
    background: linear-gradient(135deg, var(--theme-bg) 0%, var(--theme-primary) 100%);
  }

}
</style>