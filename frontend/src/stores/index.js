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
      api: api,
      loading: false
    }
  },
  mutations: {
    setActiveModal(state, active) {
      state.activeModal = active
    }, togglePasswordChange(state) {
      state.profile.showPasswordChange = !state.profile.showPasswordChange
    }, toggleEdit(state) {
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
    userCleanup(state){
      state.profile.originalData.email = ""
      state.profile.originalData.name = ""
      state.profile.profileData.email = ""
      state.profile.profileData.name = ""
      localStorage.removeItem("user")
      localStorage.removeItem("token")
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
      try {
        // Call logout API first
        await state.api.post('/api/auth/logout')
        
        // Clear authorization header
        delete state.api.defaults.headers.common['Authorization']
        
        // Clean up state and localStorage
        commit('userCleanup')
        
        return { success: true, message: 'Logged out successfully' }
      } catch (error) {
        console.error('Logout API call failed:', error)
        
        // Even if API fails, clean up locally to ensure user is logged out
        delete state.api.defaults.headers.common['Authorization']
        commit('userCleanup')
        
        return { 
          success: false, 
          message: 'Logout API failed, but local cleanup completed',
          error: error?.response?.data?.message || 'Unknown error'
        }
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
    }
  },
})

export default store