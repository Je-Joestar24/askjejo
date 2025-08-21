<template>
    <div class="form-actions" v-if="state.isEditing">
        <button type="button" @click="cancelEdit" class="btn btn-secondary" aria-label="Cancel changes">
            Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="!false" aria-label="Save profile changes">
            <svg class="save-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
            Save Changes
        </button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const state = store.state.profile

const cancelEdit = () => {
    store.dispatch('cancelEdit')
}
</script>