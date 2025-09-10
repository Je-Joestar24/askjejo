<template>
    <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input v-model="state.profileData.email" type="email" class="form-input" :disabled="!state.isEditing" :class="{ 'editing': state.isEditing }"
            aria-describedby="email-help" />
        <div class="form-help">Your email address</div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile
</script>