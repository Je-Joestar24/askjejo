<template>
    <!-- Socials -->
    <div class="footer__social" role="group" aria-label="Social links">
        <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
            class="footer__icon" :aria-label="social.name">
            <component :is="social.icon" />
        </a>
    </div>
</template>

<script setup>
import GitHubIcon from '@/components/icons/footer/GitHubIcon.vue'
import FacebookIcon from '@/components/icons/footer/FacebookIcon.vue'
import LinkedInIcon from '@/components/icons/footer/LinkedInIcon.vue'

// define your socials in an array
const socials = [
    {
        name: 'GitHub',
        url: 'https://github.com/Je-Joestar24',
        icon: GitHubIcon,
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/jejomar.parrilla',
        icon: FacebookIcon,
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jejomar-parrilla-ab5442239',
        icon: LinkedInIcon,
    },
]
</script>