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
      }
    }
  },
  mutations: {
    setActiveModal(state, active) {
      state.activeModal = active
    }, togglePasswordChange(state) {
      state.profile.showPasswordChange = !state.profile.showPasswordChange
      if (!state.profile.showPasswordChange) {
        //this.resetPasswordData()
      }
    }, toggleEdit(state) {
        state.profile.isEditing = true
        state.profile.showPasswordChange = false
    },
    cancelEdit(state) {
      state.profile.isEditing = false
      state.profile.showPasswordChange = false
      /* this.resetPasswordData()

      // Reset to original values
      const userStore = useUserStore()
      if (userStore.logged_user) {
        state.profileData.name = state.originalData.name
        state.profileData.email = state.originalData.email
      } */
    },
  },
  actions: {
    setActiveModal({ commit }, active) {
      commit('setActiveModal', active)
    },
    togglePasswordChange({ commit }) {
      commit('togglePasswordChange')
    },
    toggleEdit({ commit, state }) {
      if (state.profile.isEditing) {
        commit('cancelEdit')
      } else {
        commit('toggleEdit')
      }
    },
  },
})

export default store