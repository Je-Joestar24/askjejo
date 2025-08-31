<template>

    <div class="ask__welcome-content">
        <div class="ask__logo-container">
            <div class="ask__logo-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="var(--theme-primary)" opacity="0.1" />
                    <circle cx="16" cy="16" r="8" fill="var(--theme-primary)" opacity="0.2" />
                    <circle cx="16" cy="16" r="4" fill="var(--theme-primary)" />
                    <path d="M8 16 L24 16 M16 8 L16 24" stroke="var(--theme-accent)" stroke-width="2"
                        stroke-linecap="round" />
                </svg>
            </div>
            <h2 class="ask__welcome-title">AskJejo</h2>
            <p class="ask__welcome-subtitle">Your AI Assistant</p>
        </div>

        <div class="ask__welcome-features">
            <div class="ask__feature-item" v-for="(feature, index) in features" :key="index">
                <div class="ask__feature-icon">
                    <span class="ask__feature-dot"></span>
                </div>
                <span class="ask__feature-text">{{ feature }}</span>
            </div>
        </div>

        <div class="ask__welcome-cta">
            <p class="ask__cta-text">Start a conversation below</p>
            <div class="ask__cta-arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L12 18L17 13" stroke="var(--theme-primary)" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>

const features = [
    'Ask questions about anything',
    'Get instant AI-powered responses',
    'Save and continue conversations',
    'Access your chat history'
];
</script>