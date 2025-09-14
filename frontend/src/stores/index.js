/**
 * @file        frontend/src/stores/index.js
 * @description Root Vuex store configuration for the AskJejo application.
 *              This file orchestrates various modules and handles global state,
 *              authentication, and core application-wide actions.
 * @project     AskJejo
 */

import { createStore } from 'vuex'
import api, { csrf } from '@/config/api' // API client and CSRF token retrieval utility
import profile from './modules/profile'   // Vuex module for user profile management
import user from './modules/user'         // Vuex module for user authentication and state
import ask from './modules/ask'           // Vuex module for AI chat functionality
import notif from './modules/notif'       // Vuex module for application notifications

/**
 * Creates and configures the root Vuex store.
 * This store combines multiple feature-specific modules and defines global state,
 * mutations, and actions for the AskJejo application.
 */
const store = createStore({
  /**
   * Registers feature-specific Vuex modules.
   * Each module encapsulates its own state, mutations, getters, and actions,
   * promoting modularity and maintainability.
   */
  modules: {
    profile, // Manages user profile data and related actions (e.g., updating profile).
    user,    // Handles user authentication status, logged-in user data, and tokens.
    ask,     // Manages AI chat history, messages, and interaction logic.
    notif    // Manages application-wide notifications (e.g., success, error messages).
  },

  /**
   * Defines the global state for the root store.
   * These properties are accessible across the entire application.
   */
  state: {
    activeModal: '',     // Stores the name of the currently active modal component.
    api: api,            // Reference to the Axios API instance for making HTTP requests.
    loading: false,      // Global loading indicator, true when an async operation is in progress.
    routeMessage: ''     // A message to be displayed, often used for route-specific feedback.
  },

  /**
   * Defines synchronous mutations to modify the global state.
   * Mutations are the only way to change state in Vuex.
   */
  mutations: {
    /**
     * Sets the currently active modal.
     * @param {object} state - The current state of the store.
     * @param {string} modal - The name/identifier of the modal to activate.
     */
    setActiveModal(state, modal) {
      state.activeModal = modal
    },

    /**
     * Sets a message for route-specific feedback.
     * @param {object} state - The current state of the store.
     * @param {string} message - The message string to set. Clears if null/undefined.
     */
    setRouteMessage(state, message) {
      state.routeMessage = message || ''
    }
  },

  /**
   * Defines asynchronous actions that can commit mutations.
   * Actions handle business logic, API calls, and side effects.
   */
  actions: {
    /**
     * Handles user registration (signup).
     * This action appears to be a duplicate of the second `signup` action below.
     * @param {object} context - Vuex context object (contains state, commit, dispatch, etc.).
     * @param {object} payload - User registration data (e.g., name, email, password).
     * @returns {Promise<object>} - A promise resolving to the API response data or an error object.
     */
    async signup({ state }, payload) {
      try {
        await csrf() // Fetch CSRF token before making the request.
        const { data } = await state.api.post('/api/auth/signup', payload)
        return data
      } catch (error) {
        // Return API error response or a generic error message.
        return error?.response?.data ?? { success: false, message: 'Request failed.' }
      }
    },

    /**
     * Dispatches the 'setActiveModal' mutation to control modal visibility.
     * @param {object} context - Vuex context object (contains commit, dispatch, etc.).
     * @param {string} active - The name/identifier of the modal to activate.
     */
    setActiveModal({ commit }, active) {
      commit('setActiveModal', active)
    },

    /**
     * Handles user registration (signup).
     * This is the primary `signup` action, handling user registration with specific fields.
     * @param {object} context - Vuex context object (contains state, commit, dispatch, etc.).
     * @param {object} payload - User registration data including name, email, password, and password_confirmation.
     * @returns {Promise<object>} - A promise resolving to the API response data or an error object.
     */
    async signup({ state }, payload) {
      try {
        await csrf() // Fetch CSRF token.

        const { data } = await state.api.post('/api/auth/signup', {
          name: payload?.name,
          email: payload?.email,
          password: payload?.password,
          password_confirmation: payload?.password_confirmation,
        })

        return data
      } catch (error) {
        const responseData = error?.response?.data
        // Return API error response or a generic error message.
        return responseData ?? {
          success: false,
          message: 'Request failed.',
        }
      }
    },

    /**
     * Handles user login.
     * Authenticates the user, stores the token and user data, and sets the Authorization header.
     * @param {object} context - Vuex context object (contains state, commit, dispatch, etc.).
     * @param {object} payload - User login credentials (email, password).
     * @returns {Promise<object>} - A promise resolving to the API response data or an error object.
     */
    async login({ state }, payload) {
      try {
        await csrf() // Fetch CSRF token.

        const response = await state.api.post('/api/auth/login', {
          email: payload?.email,
          password: payload?.password,
        })

        // Update user module state with token and logged-in user data.
        state.user.token = response.data.token
        state.user.logged_user = response.data.user

        // Persist token and user data in local storage.
        localStorage.setItem('token', state.user.token)
        localStorage.setItem('user', JSON.stringify(state.user.logged_user))

        // Set Authorization header for all subsequent API requests.
        api.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
        const responseData = error?.response?.data
        // Return API error response or a generic error message.
        return responseData ?? {
          success: false,
          message: 'Request failed.',
        }
      }
    },

    /**
     * Handles user logout.
     * Invalidates the session on the backend, clears local storage, and resets API headers.
     * @param {object} context - Vuex context object (contains commit, state).
     * @returns {Promise<object>} - A promise resolving to a success/failure message.
     */
    async logout({ commit, state }) {
      if (state.loading) return // Prevent multiple logout requests.
      state.loading = true; // Set global loading state.

      try {
        // Send logout request to the backend with the current token.
        await state.api.post('/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      } catch (error) {
        console.error('Logout failed:', error)
        // Even if API call fails, clear local state for security.
        delete state.api.defaults.headers.common['Authorization']
        commit('user/cleanup') // Clean up user module state.

        return {
          success: false,
          message: `Logout failed ${error?.response?.data?.message || 'Unknown error'}`
        }
      } finally {
        // Always clear token and user data from local storage and state.
        delete state.api.defaults.headers.common['Authorization']
        commit('user/cleanup') // Clean up user module state.
        state.loading = false // Reset global loading state.
        return { success: true, message: 'Logout success' }
      }
    },

    /**
     * Initializes the store by attempting to load user authentication data from local storage.
     * This action is typically called on application startup.
     * @param {object} context - Vuex context object (contains commit, state).
     */
    initialize({ commit, state }) {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        // If a token exists, set it in the API client's default headers.
        if (token) {
          state.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        // If user data exists, parse it and initialize the profile module.
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            commit('profile/initializeUser', user)
          } catch (parseError) {
            console.error('Failed to parse user from localStorage:', parseError)
            // Clear corrupted data if parsing fails.
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          }
        }
      } catch (error) {
        console.error('Initialization failed:', error)
        // Clear potentially corrupted data in case of other initialization errors.
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    },

    /**
     * Updates the user's profile information.
     * @param {object} context - Vuex context object (contains commit, state).
     * @param {object} form - The form data containing updated user information.
     * @returns {Promise<object>} - A promise resolving to a success/failure message.
     */
    async updateUser({ commit, state }, form) {
      state.loading = true // Set global loading state.
      let response
      try {
        // Send PUT request to update user profile.
        response = await state.api.put(`/api/profile/update`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include auth token.
          }
        })

        const updatedUser = response.data.user // Backend returns the updated user object.

        // Update user data in the profile module.
        commit('profile/updateUser', updatedUser)
        if (response.data.success) {
          // If update is successful, cancel edit mode and reset password data in profile module.
          commit('profile/cancelEdit')
          commit('profile/resetPasswordData')
        }

        return {
          success: true,
          message: response.data.message
        }
      } catch (error) {
        // Handle validation errors (status 422) specifically.
        if (error.response?.status === 422) {
          return {
            success: false,
            message: response.data.message
          }
        }
        // Re-throw or handle other errors as needed.
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to update user.'
        }
      } finally {
        state.loading = false // Reset global loading state.
      }
    },

    // --- Ask Module Actions (AI Chat Functionality) ---

    /**
     * Fetches the chat history for the logged-in user.
     * @param {object} context - Vuex context object (contains commit, state).
     */
    async getChatHistory({ commit, state }) {
      try {
        state.ask.loading = true; // Set loading state for the 'ask' module.
        const response = await api.get('/api/chat/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include auth token.
          },
        });

        if (response.data.success) {
          commit('ask/setChats', response.data.data || []); // Update chat list in 'ask' module.
        } else {
          console.error('Failed to fetch chat history:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to load chat history',
          type: 'error'
        });
      } finally {
        state.ask.loading = false; // Reset loading state for the 'ask' module.
      }
    },

    /**
     * Fetches messages for a specific chat ID.
     * @param {object} context - Vuex context object (contains commit, state).
     * @param {number} chatId - The ID of the chat to fetch messages for.
     */
    async getChatMessages({ commit, state }, chatId) {
      try {
        if (!chatId) return; // Do nothing if no chat ID is provided.

        state.ask.loading = true; // Set loading state for the 'ask' module.
        const response = await api.post('api/chat/mesages/all', { id: chatId }); // API call to get messages.

        if (response.data.success) {
          commit('ask/setMessages', response.data.messages || []); // Set messages in 'ask' module.
          commit('ask/setActiveChat', { // Set the active chat in 'ask' module.
            id: response.data.chat.id,
            title: response.data.chat.title
          });
        } else {
          console.error('Failed to fetch chat messages:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to load chat messages',
          type: 'error'
        });
      } finally {
        state.ask.loading = false; // Reset loading state for the 'ask' module.
      }
    },

    /**
     * Updates the title of a specific chat.
     * @param {object} context - Vuex context object (contains commit, state).
     * @param {object} payload - Object containing `chatId` and `title`.
     */
    async updateChatTitle({ commit, state }, { chatId, title }) {
      try {
        state.loading = true; // Set global loading state.
        const response = await api.post(`api/chat/update/${chatId}`, { id: chatId, title }); // API call to update title.

        if (response.data.success) {
          commit('ask/updateChatTitle', { chatId, title }); // Update title in 'ask' module.
          state.ask.activeChat.title = title; // Update active chat title in state directly.
          commit('notif/setMessage', { // Display success notification.
            message: 'Chat title updated successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', { // Display error notification.
            message: response.data.message || 'Failed to update chat title',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error updating chat title:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to update chat title',
          type: 'error'
        });
      } finally {
        state.loading = false; // Reset global loading state.
      }
    },

    /**
     * Resets the active chat and clears all messages in the 'ask' module.
     * @param {object} context - Vuex context object (contains commit).
     */
    async resetChats({ commit }) {
      try {
        commit('ask/resetActiveChat'); // Reset active chat.
        commit('ask/clearMessages');   // Clear all messages.
      } catch (error) {
        console.error('Error resetting chats:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to reset chats',
          type: 'error'
        });
      }
    },

    /**
     * Sends a new message to the AI.
     * This action adds the user's message to the UI immediately, then sends it to the API,
     * and finally adds the bot's response. It also handles new chat creation.
     * @param {object} context - Vuex context object (contains commit, state).
     */
    async sendMessage({ commit, state }) {
      try {
        state.ask.loading = true; // Set loading state for the 'ask' module.

        // Add user message to state immediately for optimistic UI update.
        const userMessage = {
          id: Date.now(), // Temporary ID for immediate display.
          chat_id: state.ask.activeChat.id,
          user_id: state.user.logged_user?.id,
          sender: 'user',
          content: state.ask.message,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        commit('ask/addMessage', userMessage); // Add user message to the chat.

        // Prepare request payload for the API.
        const payload = {
          message: state.ask.message,
          chat_id: state.ask.activeChat.id || null, // Use existing chat ID or null for new chat.
          title: state.ask.activeChat.title || null  // Use existing title or null for new chat.
        };

        const response = await api.post('api/ask', payload); // Send message to the AI API.

        if (response.data.success) {
          // Add bot response to state after successful API call.
          const botMessage = {
            id: response.data.messages.bot.id,
            chat_id: response.data.chat_id || state.ask.activeChat.id,
            user_id: null,
            sender: 'bot',
            content: response.data.messages.bot.content,
            created_at: response.data.messages.bot.created_at,
            updated_at: response.data.messages.bot.created_at
          };
          commit('ask/addMessage', botMessage); // Add bot message to the chat.

          // If this was a new chat (no active chat ID/title before), update chat list and set active chat.
          if (!(state.ask.activeChat.id && state.ask.activeChat.title)) {
            commit('ask/addNewChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...', // Use first part of message as title.
              user_id: state.user.logged_user?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            commit('ask/setActiveChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...',
            });

            state.ask.message = '' // Clear the message input after sending.
          }

          commit('notif/setMessage', { // Display success notification.
            message: 'Message sent successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', { // Display error notification.
            message: response.data.message || 'Failed to send message',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to send message',
          type: 'error'
        });
      } finally {
        state.ask.loading = false; // Reset loading state for the 'ask' module.
      }
    },

    /**
     * Deletes the currently active chat.
     * @param {object} context - Vuex context object (contains commit, state).
     */
    async deleteChat({ commit, state }) {
      try {
        state.loading = true; // Set global loading state.
        // Send DELETE request to the API for the active chat.
        const response = await api.delete(`api/chat/delete/${state.ask.activeChat.id}`, { data: { id: state.ask.activeChat.id } });

        if (response.data.success) {
          commit('ask/removeChat', state.ask.activeChat.id); // Remove chat from the list in 'ask' module.
          // If the deleted chat was the active one, reset active chat and clear messages.
          if (state.ask.activeChat.id === state.ask.activeChat.id) { // This condition is always true if activeChat.id is set.
            commit('ask/resetActiveChat');
            commit('ask/clearMessages');
          }
          commit('notif/setMessage', { // Display success notification.
            message: 'Chat deleted successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', { // Display error notification.
            message: response.data.message || 'Failed to delete chat',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
        // Display a notification for the error.
        commit('notif/setMessage', {
          message: 'Failed to delete chat',
          type: 'error'
        });
      } finally {
        state.loading = false; // Reset global loading state.
      }
    },
  }
})

export default store