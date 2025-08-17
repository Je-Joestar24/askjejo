<template>
    <!-- Background Elements -->
    <div class="hero__background">
      <div class="hero__grid"></div>
      <div class="hero__shapes">
        <div class="hero__shape hero__shape--circle" aria-hidden="true"></div>
        <div class="hero__shape hero__shape--hexagon" aria-hidden="true"></div>
        <div class="hero__shape hero__shape--small" aria-hidden="true"></div>
      </div>
    </div>
</template>

<style scoped>

.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero__grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  animation: gridMove 20s linear infinite;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
    .hero__grid {
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    }
}
</style>