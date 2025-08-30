<template>
    <aside class="ask__sidebar" role="navigation" aria-label="Chat sessions list">
        <SidebarHeader />
        <SidebarSearch />
        <SidebarConversations />
        <SidebarFooter />
    </aside>
</template>

<script setup>
import SidebarConversations from './SidebarConversations.vue';
import SidebarFooter from './SidebarFooter.vue';
import SidebarHeader from './SidebarHeader.vue';
import SidebarSearch from './SidebarSearch.vue';
</script>