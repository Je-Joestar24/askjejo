import { createStore } from 'vuex'
import api, { csrf } from '@/config/api'
import profile from './modules/profile'
import user from './modules/user'
import ask from './modules/ask'
import notif from './modules/notif'

const store = createStore({
  modules: {
    profile,
    user,
    ask,
    notif
  },
  state: {
    activeModal: '',
    api: api,
    loading: false,
    routeMessage: ''
  },
  mutations: {
    setActiveModal(state, modal) {
      state.activeModal = modal
    },
    setRouteMessage(state, message) {
      state.routeMessage = message || ''
    }
  },
  actions: {
    async signup({ state }, payload) {
      try {
        await csrf()
        const { data } = await state.api.post('/api/auth/signup', payload)
        return data
      } catch (error) {
        return error?.response?.data ?? { success: false, message: 'Request failed.' }
      }
    },
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
        await state.api.post('/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      } catch (error) {
        console.error('Logout failed:', error)
        delete state.api.defaults.headers.common['Authorization']
        commit('user/cleanup')

        return {
          success: false,
          message: `Logout failed ${error?.response?.data?.message || 'Unknown error'}`
        }
      } finally {
        delete state.api.defaults.headers.common['Authorization']
        commit('user/cleanup')
        state.loading = false
        return { success: true, message: 'Logout success' }
      }
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
            commit('profile/initializeUser', user)
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
        commit('profile/updateUser', updatedUser)
        if (response.data.success) {
          commit('profile/cancelEdit')
          commit('profile/resetPasswordData')
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
          commit('ask/setChats', response.data.data || []);
        } else {
          console.error('Failed to fetch chat history:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        commit('notif/setMessage', {
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
          commit('ask/setMessages', response.data.messages || []);
          commit('ask/setActiveChat', {
            id: response.data.chat.id,
            title: response.data.chat.title
          });
        } else {
          console.error('Failed to fetch chat messages:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        commit('notif/setMessage', {
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
          commit('ask/updateChatTitle', { chatId, title });
          state.ask.activeChat.title = title;
          commit('notif/setMessage', {
            message: 'Chat title updated successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', {
            message: response.data.message || 'Failed to update chat title',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error updating chat title:', error);
        commit('notif/setMessage', {
          message: 'Failed to update chat title',
          type: 'error'
        });
      } finally {
        state.loading = false;
      }
    },

    async resetChats({ commit }) {
      try {
        commit('ask/resetActiveChat');
        commit('ask/clearMessages');
      } catch (error) {
        console.error('Error resetting chats:', error);
        commit('notif/setMessage', {
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

        commit('ask/addMessage', userMessage);

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

          commit('ask/addMessage', botMessage);

          // Update chat list if this is a new chat
          if (!(state.ask.activeChat.id && state.ask.activeChat.title)) {
            commit('ask/addNewChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...',
              user_id: state.user.logged_user?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            commit('ask/setActiveChat', {
              id: response.data.chat_id,
              title: state.ask.message.substring(0, 60) + '...',
            });

            state.ask.message = ''
          }

          commit('notif/setMessage', {
            message: 'Message sent successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', {
            message: response.data.message || 'Failed to send message',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        commit('notif/setMessage', {
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
          commit('ask/removeChat', state.ask.activeChat.id);
          if (state.ask.activeChat.id === state.ask.activeChat.id) {
            commit('ask/resetActiveChat');
            commit('ask/clearMessages');
          }
          commit('notif/setMessage', {
            message: 'Chat deleted successfully',
            type: 'success'
          });
        } else {
          commit('notif/setMessage', {
            message: response.data.message || 'Failed to delete chat',
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
        commit('notif/setMessage', {
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