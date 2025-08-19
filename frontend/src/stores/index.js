import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      activeModal: '',
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