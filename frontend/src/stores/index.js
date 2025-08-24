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

      if (user.logged_user) {
        state.profileData.name = state.originalData.name
        state.profileData.email = state.originalData.email
      }
    },
    initializeProfile(state){
      
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
    initialize({ state }) {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (user) {
        state.user.logged_user = user;
      }
    }
  },
})

export default store