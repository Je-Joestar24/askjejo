import { createStore } from 'vuex'
import api from '@/config/api'
import { csrf } from '@/config/api'

const store = createStore({
  state() {
    return {
      activeModal: '',
      profile: {
        isEditing: false,
        showPasswordChange: false,
        profileData: {
          name: '',
          email: '',
        },
        passwordData: {
          currentPassword: '',
          newPassword: '',
        },
        originalData: {
          name: '',
          email: '',
        }
      },
      user: {
        logged_user: null,
        token: ''
      },
      ask: {
        chats: [],
        search: '',
        activeChat: { id: null, title: '' },
        messages: [],
        message: '',
        loading: false,
        response: null,
      },
      api: api,
      loading: false,
      notif: {
        type: '',
        message: '',
      },
      routeMessage: ''
    }
  },
  getters: {
    hasProfileChanges(state) {
      return (
        state.profile.profileData.name !== state.profile.originalData.name ||
        state.profile.profileData.email !== state.profile.originalData.email
      )
    },
    hasPasswordChanges(state) {
      return state.profile.showPasswordChange && state.profile.passwordData.newPassword.length > 0
    },
    hasChanges(state, getters) {
      return getters.hasProfileChanges || getters.hasPasswordChanges
    }
  },
  mutations: {
    setActiveModal(state, active) {
      state.activeModal = active
    },
    togglePasswordChange(state) {
      state.profile.showPasswordChange = !state.profile.showPasswordChange
    },
    toggleEdit(state) {
      state.profile.isEditing = true
      state.profile.showPasswordChange = false
    },
    resetPasswordData(state) {
      state.profile.passwordData.currentPassword = ''
      state.profile.passwordData.newPassword = ''
    },
    cancelEdit(state) {
      state.profile.isEditing = false
      state.profile.showPasswordChange = false

      if (state.user.logged_user) {
        state.profile.profileData.name = state.profile.originalData.name
        state.profile.profileData.email = state.profile.originalData.email
      }
    },
    updateUser(state, user) {
      Object.assign(state.profile.originalData, state.profile.profileData)
      localStorage.setItem('user', JSON.stringify(user))
    },
    initializeUser(state, user) {
      if (!user || typeof user !== 'object') return;

      // Destructure only needed properties for better performance
      const { name, email } = user;

      // Validate required fields exist
      if (!name || !email) return;

      // Update user state
      state.user.logged_user = user;

      // Batch profile updates for better performance
      const profileUpdates = { name, email };
      Object.assign(state.profile.originalData, profileUpdates);
      Object.assign(state.profile.profileData, profileUpdates);
    },
    userCleanup(state) {
      const cleanData = { email: "", name: "" }
      Object.assign(state.profile.originalData, cleanData)
      Object.assign(state.profile.profileData, cleanData)

      state.user.logged_user = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    },
    setMessage(state, param) {
      if (!param) {
        Object.assign(state.notif, { type: '', message: '' })
        return
      }

      Object.assign(state.notif, param)
    },
    setRouteMessage(state, message) {
      if (!message) state.routeMessage = ''
      state.routeMessage = message
    },
    setChats(state, chats) {
      state.ask.chats = chats;
    },
    setActiveChat(state, chat) {
      state.ask.activeChat = chat;
    },
    setMessages(state, messages) {
      state.ask.messages = messages;
    },
    addMessage(state, message) {
      state.ask.messages.push(message);
    },
    updateChatTitle(state, { chatId, title }) {
      const chatIndex = state.ask.chats.findIndex(chat => chat.id === chatId);
      if (chatIndex !== -1) {
        state.ask.chats[chatIndex].title = title;
      }
    },
    removeChat(state, chatId) {
      state.ask.chats = state.ask.chats.filter(chat => chat.id !== chatId);
    },
    resetActiveChat(state) {
      state.ask.activeChat = { id: null, title: '' };
    },
    clearMessages(state) {
      state.ask.messages = [];
    },
    addNewChat(state, chat) {
      state.ask.chats.reverse()
      state.ask.chats.push(chat)
      state.ask.chats.reverse()
    }
  },
  actions: {
    setActiveModal({ commit }, active) {
      commit('setActiveModal', active)
    },
    async signup({ state }, payload) {
      try {
        await csrf()

        const { data } = await state.api.post('/api/auth/signup', {
          name: payload?.name,
          email: payload?.email,
          password: payload?.password,
          password_confirmation: payload?.password_confirmation,
        })

        return data
      } catch (error) {
        const responseData = error?.response?.data
        return responseData ?? {
          success: false,
          message: 'Request failed.',
        }
      }
    },
    async login({ state }, payload) {
      try {
        await csrf()

        const response = await state.api.post('/api/auth/login', {
          email: payload?.email,
          password: payload?.password,
        })

        state.user.token = response.data.token
        state.user.logged_user = response.data.user
        localStorage.setItem('token', state.user.token)
        localStorage.setItem('user', JSON.stringify(state.user.logged_user))
        api.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
        const responseData = error?.response?.data
        return responseData ?? {
          success: false,
          message: 'Request failed.',
        }
      }
    },
    async logout({ commit, state }) {
      if (state.loading) return
      state.loading = true;

      try {
        delete state.api.defaults.headers.common['Authorization']
        commit('userCleanup')
        return { success: true, message: 'Logged out successfully' }
      } catch (error) {
        console.error('Logout failed:', error)
        delete state.api.defaults.headers.common['Authorization']
        commit('userCleanup')

        return {
          success: false,
          message: `Logout failed ${error?.response?.data?.message || 'Unknown error'}`
        }
      } finally {
        state.loading = false
      }
    },
    togglePasswordChange({ commit, state }) {
      commit('togglePasswordChange')
      if (!state.profile.showPasswordChange) {
        commit('resetPasswordData')
      }
    },
    toggleEdit({ commit, state }) {
      if (state.profile.isEditing) {
        commit('cancelEdit')
      } else {
        commit('toggleEdit')
      }
    },
    cancelEdit({ commit }) {
      commit('cancelEdit')
    },
    initialize({ commit, state }) {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        if (token) {
          state.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            commit('initializeUser', user)
          } catch (parseError) {
            console.error('Failed to parse user from localStorage:', parseError)
            // Clear corrupted data
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          }
        }
      } catch (error) {
        console.error('Initialization failed:', error)
        // Clear potentially corrupted data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    },
    async updateUser({ commit, state }, form) {
      state.loading = true
      let response
      try {

        response = await state.api.put(`/api/profile/update`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        // backend returns updated user
        const updatedUser = response.data.user

        // store only id, name, email in localStorage
        commit('updateUser', updatedUser)
        if (response.data.success) {
          commit('cancelEdit')
          commit('resetPasswordData')
        }

        return {
          success: true,
          message: response.data.message
        }
      } catch (error) {
        if (error.response?.status === 422) {
          return {
            success: false,
            message: response.data.message
          }
        }
      } finally {
        state.loading = false
      }
    },
    // Ask actions
    async getChatHistory({ commit, state }) {
      try {
        state.ask.loading = true;
        const response = await api.get('/api/chat/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming you store auth token
          },
        });

        if (response.data.success) {
          commit('setChats', response.data.data || []);
        } else {
          console.error('Failed to fetch chat history:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        commit('setMessage', {
          message: 'Failed to load chat history',
          type: 'error'
        });
      } finally {
        state.ask.loading = false;
      }
    },

    async getChatMessages({ commit, state }, chatId) {
      try {
        if (!chatId) return;

        state.ask.loading = true;
        const response = await api.post('api/chat/mesages/all', { id: chatId });

        if (response.data.success) {
          commit('setMessages', response.data.messages || []);
          commit('setActiveChat', {
            id: response.data.chat.id,
            title: response.data.chat.title
          });
        } else {
          console.error('Failed to fetch chat messages:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        commit('setMessage', {
          message: 'Failed to load chat messages',
          type: 'error'
        });
      } finally {
        state.ask.loading = false;
      }
    },

    async updateChatTitle({ commit, state }, { chatId, title }) {
      try {
        state.loading = true;
        const response = await api.post(`api/chat/update/${chatId}`, { id: chatId, title });

        if (response.data.success) {
          commit('updateChatTitle', { chatId, title });
          state.ask.activeChat.title = title;
          commit('setMessage', {
            message: 'Chat title updated successfully',
            type: 'success'
          });
        } else {
          commit('setMessage', {
            message: response.data.message || 'Failed to update chat title',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error updating chat title:', error);
        commit('setMessage', {
          message: 'Failed to update chat title',
          type: 'error'
        });
      } finally {
        state.loading = false;
      }
    },

    async resetChats({ commit }) {
      try {
        commit('resetActiveChat');
        commit('clearMessages');
        commit('setMessage', {
          message: 'Chats reset successfully',
          type: 'success'
        });
      } catch (error) {
        console.error('Error resetting chats:', error);
        commit('setMessage', {
          message: 'Failed to reset chats',
          type: 'error'
        });
      }
    },

    async sendMessage({ commit, state }) {
      try {
        state.ask.loading = true;

        // Add user message to state immediately
        const userMessage = {
          id: Date.now(), // Temporary ID
          chat_id: state.ask.activeChat.id,
          user_id: state.user.logged_user?.id,
          sender: 'user',
          content: state.ask.message,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        commit('addMessage', userMessage);

        // Prepare request payload
        const payload = {
          message: state.ask.message,
          chat_id: state.ask.activeChat.id || null,
          title: state.ask.activeChat.title || null
        };

        const response = await api.post('api/ask', payload);

        if (response.data.success) {

          // Add bot response to state
          const botMessage = {
            id: response.data.messages.bot.id,
            chat_id: response.data.chat_id || state.ask.activeChat.id,
            user_id: null,
            sender: 'bot',
            content: response.data.messages.bot.content,
            created_at: response.data.messages.bot.created_at,
            updated_at: response.data.messages.bot.created_at
          };

          commit('addMessage', botMessage);

          // Update chat list if this is a new chat
          if (!(state.ask.activeChat.id && state.ask.activeChat.title)) {
            commit('addNewChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...',
              user_id: state.user.logged_user?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            commit('setActiveChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...',
            });

            state.ask.message = ''
          }

          commit('setMessage', {
            message: 'Message sent successfully',
            type: 'success'
          });
        } else {
          commit('setMessage', {
            message: response.data.message || 'Failed to send message',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        commit('setMessage', {
          message: 'Failed to send message',
          type: 'error'
        });
      } finally {
        state.ask.loading = false;
      }
    },

    async deleteChat({ commit, state }) {
      try {
        state.loading = true;
        const response = await api.delete(`api/chat/delete/${state.ask.activeChat.id}`, { data: { id: state.ask.activeChat.id } });

        if (response.data.success) {
          commit('removeChat', state.ask.activeChat.id);
          if (state.ask.activeChat.id === state.ask.activeChat.id) {
            commit('resetActiveChat');
            commit('clearMessages');
          }
          commit('setMessage', {
            message: 'Chat deleted successfully',
            type: 'success'
          });
        } else {
          commit('setMessage', {
            message: response.data.message || 'Failed to delete chat',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
        commit('setMessage', {
          message: 'Failed to delete chat',
          type: 'error'
        });
      } finally {
        state.loading = false;
      }
    },
  }
})

export default store