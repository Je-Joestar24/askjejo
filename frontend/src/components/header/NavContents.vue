<template>
    <!-- Main navigation container -->
    <nav class="header__nav" role="navigation" aria-label="Primary navigation">
        <div class="header__container">
            <Logo/>
            <NavItems/>
            <Buttons/>

        </div>
    </nav>
</template>
<script setup>
import Buttons from './buttons.vue';
import Logo from './Logo.vue';
import NavItems from './NavItems.vue';
</script>