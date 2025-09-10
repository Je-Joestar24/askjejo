<template>
    <header class="ask__chat-header" aria-label="Chat header">
        <div class="ask__chat-title-group">
            <h1 v-if="!isEditing" class="ask__chat-title" aria-label="Current conversation title">
                {{ activeChat.title || 'New Chat' }}
            </h1>
            <input v-else ref="titleInput" type="text" class="ask__input ask__chat-title" v-model="editingTitle"
                @keyup.enter="saveTitle" @keyup.esc="cancelEdit" :placeholder="activeChat.title || 'Enter chat title'"
                aria-label="Edit chat title" />
        </div>
        <div v-if="activeChat.id" class="ask__chat-actions">
            <button v-if="!isEditing" class="ask__chat-action" aria-label="Rename chat" @click="startEdit">
                Rename
            </button>
            <button v-else class="ask__chat-action" aria-label="Save chat title" @click="saveTitle">
                Save
            </button>
            <button v-if="isEditing" class="ask__chat-action danger" aria-label="Cancel edit" @click="cancelEdit">
                Cancel
            </button>
            <button v-if="!isEditing" class="ask__chat-action danger" aria-label="Delete chat" @click="deleteChat">
                Delete
            </button>
        </div>
        <AskArrow />
    </header>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import AskArrow from './AskArrow.vue';

const store = useStore();
const isEditing = ref(false);
const editingTitle = ref('');
const titleInput = ref(null);

// Computed properties
const activeChat = computed(() => store.state.ask.activeChat);

// Methods
const startEdit = async () => {
    if (!activeChat.value.id) return;

    editingTitle.value = activeChat.value.title || '';
    isEditing.value = true;

    // Focus the input after DOM update
    await nextTick();
    titleInput.value?.focus();
    titleInput.value?.select();
};

const saveTitle = async () => {
    if (!activeChat.value.id || !editingTitle.value.trim()) return;

    const newTitle = editingTitle.value.trim();

    // Don't update if title hasn't changed
    if (newTitle === activeChat.value.title) {
        isEditing.value = false;
        return;
    }

    try {
        await store.dispatch('updateChatTitle', {
            chatId: activeChat.value.id,
            title: newTitle
        });
        isEditing.value = false;
    } catch (error) {
        console.error('Failed to update chat title:', error);
    }
};

const cancelEdit = () => {
    isEditing.value = false;
    editingTitle.value = '';
};

const deleteChat = async () => {
    if (!activeChat.value.id) return;

    if (confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
        await store.dispatch('deleteChat');
    }
};

// Watch for activeChat changes to reset edit state
watch(activeChat, () => {
    if (isEditing.value) {
        cancelEdit();
    }
}, { deep: true });
</script>