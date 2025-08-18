<template>
    <!-- Features Grid -->
    <div class="features__grid">
        <FeatureCard :title="'Multi-Platform Integration'" :description="`Access AskJejo AI seamlessly across web, mobile, and desktop
                    platforms for consistent experience everywhere.`" :icon="MultiPlatformIcon" :image="MultiPlatformImg"/>
        <!-- Feature Card 2 -->
        <div class="feature-card" role="article" aria-label="Intelligent Context Understanding">
            <div class="feature-card__icon">
                <div class="feature-card__icon-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3s-3-1-3-3a3 3 0 0 1 3-3z" stroke="currentColor"
                            stroke-width="2" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                            stroke="currentColor" stroke-width="2" />
                        <path d="M18.5 16.5c-.83 1.67-2.17 2.5-3.5 2.5s-2.67-.83-3.5-2.5" stroke="currentColor"
                            stroke-width="2" />
                    </svg>
                </div>
            </div>
            <div class="feature-card__content">
                <h3 class="feature-card__title">Real-Time Conversations</h3>
                <p class="feature-card__description">Description: Instant responses powered by Groq API, making your
                    chats smooth and natural.</p>
            </div>
            <div class="feature-card__image">
                <div class="feature-card__image-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor"
                            stroke-width="2" />
                        <path d="M13 8H7" stroke="currentColor" stroke-width="2" />
                        <path d="M17 12H7" stroke="currentColor" stroke-width="2" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Feature Card 3 -->
        <div class="feature-card" role="article" aria-label="Real-Time Learning & Adaptation">
            <div class="feature-card__icon">
                <div class="feature-card__icon-bg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor"
                            stroke-width="2" />
                        <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <div class="feature-card__content">
                <h3 class="feature-card__title">Simple & Secure</h3>
                <p class="feature-card__description">Description: Clean, lightweight design with user authentication
                    to keep your data private.</p>
            </div>
            <div class="feature-card__image">
                <div class="feature-card__image-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" />
                        <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';

// Icons and Images
import MultiPlatformIcon from '@/components/icons/home/MultiPlatformIcon.vue';
import MultiPlatformImg from '@/components/icons/home/MultiPlatformImg.vue';
</script>