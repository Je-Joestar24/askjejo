import { createStore } from 'vuex'

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
      user: {logged_user: null}
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
  },
  actions: {
    setActiveModal({ commit }, active) {
      commit('setActiveModal', active)
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
    cancelEdit({commit}){
      commit('cancelEdit')
    }
  },
})

export default store