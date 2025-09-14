/**
 * @module AskJejo/AskStore
 * @description
 * This Vuex module (`ask.js`) serves as the central state management for all "AskJejo" related
 * functionalities, primarily handling chat interactions, messages, and chat list management.
 * It is a core dependency for the `AskView` component, providing the necessary data and
 * methods to power the user interface for asking questions and managing conversations.
 *
 * The store manages the lifecycle of chat sessions, from displaying a list of chats,
 * filtering them, managing the active chat, to handling individual messages within a chat.
 * It also includes state for UI elements like loading indicators and specific toggles.
 */
export default {
    /**
     * @property {boolean} namespaced - Indicates that this module is namespaced.
     * This means its state, getters, mutations, and actions will be accessed via `ask/`.
     */
    namespaced: true,

    /**
     * @function state
     * @description
     * Defines the initial state for the 'ask' module.
     * @returns {object} The initial state object.
     */
    state: () => ({
        /**
         * @property {Array<Object>} chats - An array containing all chat objects.
         * Each chat object typically includes an `id` and a `title`.
         * Example: `[{ id: 1, title: 'My first question' }, { id: 2, title: 'About Laravel' }]`
         */
        chats: [],
        /**
         * @property {string} search - The current search term used to filter the chat list.
         * This value is bound to a search input in the UI.
         */
        search: '',
        /**
         * @property {Object} activeChat - The currently selected chat object.
         * It contains `id` (number|null) and `title` (string).
         * Example: `{ id: 1, title: 'My first question' }`
         */
        activeChat: { id: null, title: '' },
        /**
         * @property {Array<Object>} messages - An array containing all messages for the `activeChat`.
         * Each message object typically includes `id`, `text`, `sender`, `timestamp`, etc.
         */
        messages: [],
        /**
         * @property {string} message - The current message text being composed by the user.
         * This is typically bound to a message input field.
         */
        message: '',
        /**
         * @property {boolean} loading - A boolean flag indicating if an asynchronous operation (e.g., API call) is in progress.
         * Used to show/hide loading indicators in the UI.
         */
        loading: false,
        /**
         * @property {Object|null} response - Stores the latest response from the AI or backend.
         * Can be `null` if no response is available or pending.
         */
        response: null,
        /**
         * @property {boolean} arrow - A boolean flag used for UI toggles, for an arrow icon's direction or visibility.
         */
        arrow: false,
    }),

    /**
     * @function getters
     * @description
     * Defines computed properties based on the state, allowing for derived state.
     */
    getters: {
        /**
         * @function filteredChats
         * @description
         * Filters the `chats` array based on the `search` term.
         * If the search term is empty, all chats are returned.
         * @param {object} state - The current state of the module.
         * @returns {Array<Object>} An array of chat objects matching the search term.
         */
        filteredChats(state) {
            if (!state.search.trim()) return state.chats
            const term = state.search.toLowerCase().trim()
            return state.chats.filter(chat => chat.title?.toLowerCase().includes(term))
        }
    },

    /**
     * @function mutations
     * @description
     * Defines methods that directly modify the state. Mutations are synchronous.
     */
    mutations: {
        /**
         * @function setChats
         * @description
         * Sets the entire `chats` array.
         * @param {object} state - The current state of the module.
         * @param {Array<Object>} chats - The new array of chat objects.
         */
        setChats(state, chats) {
            state.chats = chats
        },
        /**
         * @function setActiveChat
         * @description
         * Sets the `activeChat` object.
         * @param {object} state - The current state of the module.
         * @param {Object} chat - The chat object to set as active.
         */
        setActiveChat(state, chat) {
            state.activeChat = chat
        },
        /**
         * @function setMessages
         * @description
         * Sets the entire `messages` array for the active chat.
         * @param {object} state - The current state of the module.
         * @param {Array<Object>} messages - The new array of message objects.
         */
        setMessages(state, messages) {
            state.messages = messages
        },
        /**
         * @function addMessage
         * @description
         * Adds a new message to the `messages` array.
         * @param {object} state - The current state of the module.
         * @param {Object} message - The message object to add.
         */
        addMessage(state, message) {
            state.messages.push(message)
        },
        /**
         * @function updateChatTitle
         * @description
         * Updates the title of a specific chat within the `chats` array.
         * @param {object} state - The current state of the module.
         * @param {object} payload - An object containing `chatId` (ID of the chat) and `title` (new title).
         */
        updateChatTitle(state, { chatId, title }) {
            const chat = state.chats.find(c => c.id === chatId)
            if (chat) chat.title = title
        },
        /**
         * @function removeChat
         * @description
         * Removes a chat from the `chats` array based on its ID.
         * @param {object} state - The current state of the module.
         * @param {number} chatId - The ID of the chat to remove.
         */
        removeChat(state, chatId) {
            state.chats = state.chats.filter(c => c.id !== chatId)
        },
        /**
         * @function resetActiveChat
         * @description
         * Resets the `activeChat` to its initial empty state.
         * This is typically called when starting a new chat or clearing the current one.
         * @param {object} state - The current state of the module.
         */
        resetActiveChat(state) {
            state.activeChat = { id: null, title: '' }
        },
        /**
         * @function clearMessages
         * @description
         * Clears all messages from the `messages` array.
         * This is typically called when switching to a new chat or starting a new conversation.
         * @param {object} state - The current state of the module.
         */
        clearMessages(state) {
            state.messages = []
        },
        /**
         * @function addNewChat
         * @description
         * Adds a new chat object to the beginning of the `chats` array.
         * @param {object} state - The current state of the module.
         * @param {Object} chat - The new chat object to add.
         */
        addNewChat(state, chat) {
            state.chats.unshift(chat) // simpler than reverse()
        },
        /**
         * @function toggleArrow
         * @description
         * Toggles the boolean value of the `arrow` state property.
         * @param {object} state - The current state of the module.
         */
        toggleArrow(state) {
            state.arrow = !state.arrow
        }
    }
}
