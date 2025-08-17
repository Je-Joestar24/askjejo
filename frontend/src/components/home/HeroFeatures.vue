<template>

    <div class="hero__features">
        <div class="hero__feature">
            <span class="hero__feature-number">24/7</span>
            <span class="hero__feature-label">Available</span>
        </div>
        <div class="hero__feature">
            <span class="hero__feature-number">Instant</span>
            <span class="hero__feature-label">Responses</span>
        </div>
        <div class="hero__feature">
            <span class="hero__feature-number">Secure</span>
            <span class="hero__feature-label">Platform</span>
        </div>
    </div>
</template>

<style scoped>
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

.hero__feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
}

.hero__feature-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--theme-primary);
    text-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
}

.hero__feature-label {
    font-size: 0.875rem;
    color: var(--text-dark);
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .hero__features {
    gap: 2rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
    .hero__features {
        gap: 1.5rem;
    }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
    .hero__feature-label {
        color: var(--text-light);
    }

}
</style>