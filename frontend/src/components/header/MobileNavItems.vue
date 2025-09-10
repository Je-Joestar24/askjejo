<template>
    <!-- Backdrop -->
    <transition name="mobile-nav-backdrop">
        <div v-if="openNav" class="mobile-nav__backdrop" @click="closeNav" />
    </transition>

    <!-- Drawer -->
    <transition name="mobile-nav-drawer">
        <nav v-if="openNav" class="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile menu">
            <button class="mobile-nav__close" @click="closeNav" aria-label="Close menu">
                ✕
            </button>

            <ul class="mobile-nav__list">
                <li v-for="(item, idx) in items" :key="item.key" class="mobile-nav__item"
                    :style="{ transitionDelay: (idx * 80) + 'ms' }">
                    <component :is="item.type" v-bind="item.props" class="mobile-nav__link" @click="onItemClick(item)">
                        {{ item.label }}
                    </component>
                </li>
            </ul>
        </nav>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props + emits
const props = defineProps({
    openNav: { type: Boolean, default: false },
})
const emit = defineEmits(['update:openNav', 'open-modal'])

// Menu items (static for now)
const items = [
    { key: 'home', label: 'Home', type: 'router-link', props: { to: '/' } },
    { key: 'about', label: 'About', type: 'router-link', props: { to: '/about' } },
    { key: 'login', label: 'Login', type: 'button', props: { type: 'button' } },
    { key: 'signup', label: 'Signup', type: 'button', props: { type: 'button' } },
]

function closeNav() {
    emit('update:openNav', false)
}

function onItemClick(item) {
    if (item.key === 'login' || item.key === 'signup') {
        emit('open-modal', item.key)
    }
    closeNav()
}
</script>