export default {
    namespaced: true,
    state: () => ({
        type: '',
        message: ''
    }),
    mutations: {
        setMessage(state, payload) {
            if (!payload) {
                state.type = ''
                state.message = ''
            } else {
                Object.assign(state, payload)
            }
        }
    }
}
