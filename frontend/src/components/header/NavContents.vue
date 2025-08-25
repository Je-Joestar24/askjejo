<template>
    <!-- Main navigation container -->
    <nav class="header__nav" role="navigation" aria-label="Primary navigation">
        <div class="header__container">
            <Logo/>
            <NavItems/>
            <Buttons v-if="!state.user.logged_user"/>
            <Profile v-else/>
        </div>
    </nav>
</template>
<script setup>
import { useStore } from 'vuex';
import Buttons from './Buttons.vue';
import Logo from './Logo.vue';
import NavItems from './NavItems.vue';
import Profile from './Profile.vue';

const store = useStore()
const state = store.state
</script>