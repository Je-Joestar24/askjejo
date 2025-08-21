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
    },
  },
  actions: {
    setActiveModal({ commit }, active) {
      commit('setActiveModal', active)
    },
  },
})

export default store