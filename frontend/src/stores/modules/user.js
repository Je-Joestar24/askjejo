export default {
    namespaced: true,
    state: () => ({
        logged_user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || ''
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutations: {
        setUser(state, user) {
            state.logged_user = user
        },
        setToken(state, token) {
            state.token = token
        },
        cleanup(state) {
            state.logged_user = null
            state.token = ''
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }
}
