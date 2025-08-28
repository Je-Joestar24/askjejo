<template>
    <!-- Navigation links -->
    <ul class="header__nav-list" role="list">
        <li v-if="route.name != 'ask'" v-for="item in filteredNavItems" :key="item.to" class="header__nav-item">
            <RouterLink :to="item.to" class="header__nav-link" active-class="header__nav-link--active">
                {{ item.label }}
            </RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute();

const navItems = ref([
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Ask', to: '/ask' }
])


const filteredNavItems = computed(() => {
    if (store.state.user.logged_user) {
        return navItems.value.filter(item => !['/', '/about'].includes(item.to))
    } else {
        return navItems.value.filter(item => ['/', '/about'].includes(item.to))
    }
})
</script>