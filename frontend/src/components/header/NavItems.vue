<template>
    <!-- Navigation links -->
    <ul class="header__nav-list" role="list">
        <li v-for="item in navItems" :key="item.to" class="header__nav-item">
            <RouterLink :to="item.to" class="header__nav-link" active-class="header__nav-link--active">
                {{ item.label }}
            </RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
]
</script>