/**
 * @module AskJejo/UserStore
 * @description
 * This Vuex module (`user.js`) manages the authentication state and user-related
 * information for the AskJejo application. It handles storing the currently logged-in
 * user's data and their authentication token, primarily using `localStorage` for
 * persistence across sessions.
 *
 * This store provides mechanisms to check user authentication status, set user data
 * and tokens upon login, and clear them upon logout, ensuring a consistent
 * authentication experience throughout the application.
 */
export default {
    /**
     * @property {boolean} namespaced - Indicates that this module is namespaced.
     * This means its state, getters, mutations, and actions will be accessed via `user/`.
     */
    namespaced: true,

    /**
     * @function state
     * @description
     * Defines the initial state for the 'user' module.
     * It attempts to retrieve user data and token from `localStorage` to maintain
     * login state across browser sessions.
     * @returns {object} The initial state object.
     */
    state: () => ({
        /**
         * @property {object|null} logged_user - The object representing the currently logged-in user.
         * It is initialized by parsing the 'user' item from `localStorage` or `null` if not found.
         * Example: `{ id: 1, name: 'John Doe', email: 'john@example.com' }`
         */
        logged_user: JSON.parse(localStorage.getItem('user')) || null,
        /**
         * @property {string} token - The authentication token for the logged-in user.
         * It is initialized by retrieving the 'token' item from `localStorage` or an empty string if not found.
         * This token is typically used for API requests.
         */
        token: localStorage.getItem('token') || ''
    }),

    /**
     * @function getters
     * @description
     * Defines computed properties based on the state, allowing for derived state.
     */
    getters: {
        /**
         * @function isAuthenticated
         * @description
         * Checks if the user is authenticated by verifying the presence of an authentication token.
         * @param {object} state - The current state of the module.
         * @returns {boolean} `true` if a token exists (user is authenticated), `false` otherwise.
         */
        isAuthenticated: (state) => !!state.token,
    },

    /**
     * @function mutations
     * @description
     * Defines methods that directly modify the state. Mutations are synchronous.
     */
    mutations: {
        /**
         * @function setUser
         * @description
         * Sets the `logged_user` state and persists it to `localStorage`.
         * @param {object} state - The current state of the module.
         * @param {object} user - The user object to be stored.
         */
        setUser(state, user) {
            state.logged_user = user
            localStorage.setItem("user", JSON.stringify(user))
        },
        /**
         * @function setToken
         * @description
         * Sets the `token` state and persists it to `localStorage`.
         * @param {object} state - The current state of the module.
         * @param {string} token - The authentication token string to be stored.
         */
        setToken(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        /**
         * @function cleanup
         * @description
         * Clears the `logged_user` and `token` from the state and `localStorage`,
         * effectively logging out the user.
         * @param {object} state - The current state of the module.
         */
        cleanup(state) {
            state.logged_user = null
            state.token = ''
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }
}
