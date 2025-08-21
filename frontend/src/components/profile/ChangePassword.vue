<template>
    <!-- Change Password Section -->
    <div class="password-section" v-show="state.isEditing">
        <ChangePassCta />
        <ChangePassForm />
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import ChangePassForm from './ChangePassForm.vue'
import ChangePassCta from './ChangePassCta.vue'

const store = useStore()
const state = store.state.profile
</script>
