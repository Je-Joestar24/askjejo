<template>
    <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input v-model="state.profileData.name" type="text" class="form-input" :disabled="!state.isEditing"
            :class="{ 'editing': state.isEditing }" aria-describedby="username-help" />
        <div class="form-help">Your display name</div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile
</script>