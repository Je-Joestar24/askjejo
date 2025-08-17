import { createStore } from 'vuex'
import { user } from './user'

const store = createStore({
  state() {
    return {
        ...user.state
    }   
  },
  mutations: {
    ...user.mutations
  },
  actions: {
    ...user.actions
  },
  getters: {
    ...user.getters
  }
})

export default store
