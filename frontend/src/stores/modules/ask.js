export default {
    namespaced: true,
    state: () => ({
        chats: [],
        search: '',
        activeChat: { id: null, title: '' },
        messages: [],
        message: '',
        loading: false,
        response: null,
    }),
    getters: {
        filteredChats(state) {
            if (!state.search.trim()) return state.chats
            const term = state.search.toLowerCase().trim()
            return state.chats.filter(chat => chat.title?.toLowerCase().includes(term))
        }
    },
    mutations: {
        setChats(state, chats) {
            state.chats = chats
        },
        setActiveChat(state, chat) {
            state.activeChat = chat
        },
        setMessages(state, messages) {
            state.messages = messages
        },
        addMessage(state, message) {
            state.messages.push(message)
        },
        updateChatTitle(state, { chatId, title }) {
            const chat = state.chats.find(c => c.id === chatId)
            if (chat) chat.title = title
        },
        removeChat(state, chatId) {
            state.chats = state.chats.filter(c => c.id !== chatId)
        },
        resetActiveChat(state) {
            state.activeChat = { id: null, title: '' }
        },
        clearMessages(state) {
            state.messages = []
        },
        addNewChat(state, chat) {
            state.chats.unshift(chat) // simpler than reverse()
        }
    }
}
