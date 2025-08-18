<template>
    <!-- Features Grid -->
    <div class="features__grid">
        <FeatureCard :title="'Multi-Platform Integration'" :description="`Access AskJejo AI seamlessly across web, mobile, and desktop
                    platforms for consistent experience everywhere.`" :icon="MultiPlatformIcon" :image="MultiPlatformImg"/>
        
        <FeatureCard :title="'Real-Time Conversations'" :description="`Instant responses powered by Groq API, making your
                    chats smooth and natural.`" :icon="RealTimeIcon" :image="RealTimeImg"/>
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
import RealTimeIcon from '@/components/icons/home/RealTimeIcon.vue';
import RealTimeImg from '@/components/icons/home/RealTimeImg.vue';
</script>