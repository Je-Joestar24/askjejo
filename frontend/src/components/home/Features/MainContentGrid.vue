<template>
    <!-- Features Grid -->
    <div class="features__grid">
        <FeatureCard v-for="(feature, index) in features" :key="index" :payload="feature" />
    </div>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';

// Icons and Images
import MultiPlatformIcon from '@/components/icons/home/MultiPlatformIcon.vue';
import MultiPlatformImg from '@/components/icons/home/MultiPlatformImg.vue';
import RealTimeIcon from '@/components/icons/home/RealTimeIcon.vue';
import RealTimeImg from '@/components/icons/home/RealTimeImg.vue';
import SimpleSecureIcon from '@/components/icons/home/SimpleSecureIcon.vue';
import SimpleSecureImg from '@/components/icons/home/SimpleSecureImg.vue';

const features = [
    {
        title: "Multi-Platform Integration",
        description:
            "Access AskJejo AI seamlessly across web, mobile, and desktop platforms for consistent experience everywhere.",
        icon: MultiPlatformIcon,
        image: MultiPlatformImg,
    },
    {
        title: "Real-Time Conversations",
        description:
            "Instant responses powered by Groq API, making your chats smooth and natural.",
        icon: RealTimeIcon,
        image: RealTimeImg,
    },
    {
        title: "Simple & Secure",
        description:
            "Lean, lightweight design with user authentication to keep your data private.",
        icon: SimpleSecureIcon,
        image: SimpleSecureImg,
    },
];
</script>