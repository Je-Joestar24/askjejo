/**
 * @module AskJejo/ProfileStore
 * @description
 * This Vuex module (`profile.js`) manages the state and logic related to user profile
 * management within the AskJejo application. It handles functionalities such as
 * displaying and editing user profile information (name, email), managing password
 * change requests, and tracking changes to enable or disable save actions.
 *
 * This store is designed to be bound to profile-related view components, centralizing
 * all profile-specific data and operations, and allowing for subdivision into smaller
 * components while maintaining a single source of truth for profile state.
 */
export default {
    /**
     * @property {boolean} namespaced - Indicates that this module is namespaced.
     * This means its state, getters, mutations, and actions will be accessed via `profile/`.
     */
    namespaced: true,

    /**
     * @function state
     * @description
     * Defines the initial state for the 'profile' module.
     * @returns {object} The initial state object.
     */
    state: () => ({
        /**
         * @property {boolean} isEditing - A flag indicating whether the profile is currently in edit mode.
         * When `true`, profile fields are typically editable.
         */
        isEditing: false,
        /**
         * @property {boolean} showPasswordChange - A flag indicating whether the password change form is visible.
         * When `true`, the UI for changing password is displayed.
         */
        showPasswordChange: false,
        /**
         * @property {object} profileData - An object holding the current profile data being displayed or edited.
         * This data is typically bound to input fields in the UI.
         * @property {string} profileData.name - The user's current name.
         * @property {string} profileData.email - The user's current email address.
         */
        profileData: {
            name: '',
            email: '',
        },
        /**
         * @property {object} passwordData - An object holding the data for password change operations.
         * @property {string} passwordData.currentPassword - The user's current password, required for verification.
         * @property {string} passwordData.newPassword - The new password the user wishes to set.
         */
        passwordData: {
            currentPassword: '',
            newPassword: '',
        },
        /**
         * @property {object} originalData - An object storing the original, unmodified profile data.
         * Used to compare against `profileData` to detect changes and to revert changes if editing is cancelled.
         * @property {string} originalData.name - The original user's name.
         * @property {string} originalData.email - The original user's email address.
         */
        originalData: {
            name: '',
            email: '',
        }
    }),

    /**
     * @function getters
     * @description
     * Defines computed properties based on the state, allowing for derived state.
     */
    getters: {
        /**
         * @function hasProfileChanges
         * @description
         * Checks if there are any changes in the `profileData` compared to `originalData`.
         * @param {object} state - The current state of the module.
         * @returns {boolean} `true` if name or email has changed, `false` otherwise.
         */
        hasProfileChanges(state) {
            return (
                state.profileData.name !== state.originalData.name ||
                state.profileData.email !== state.originalData.email
            )
        },
        /**
         * @function hasPasswordChanges
         * @description
         * Checks if the password change form is visible and a new password has been entered.
         * @param {object} state - The current state of the module.
         * @returns {boolean} `true` if password change is active and new password is not empty, `false` otherwise.
         */
        hasPasswordChanges(state) {
            return state.showPasswordChange && state.passwordData.newPassword.length > 0
        },
        /**
         * @function hasChanges
         * @description
         * A composite getter that checks if there are any profile or password changes pending.
         * @param {object} state - The current state of the module.
         * @param {object} getters - The getters of the module.
         * @returns {boolean} `true` if either profile data or password data has changes, `false` otherwise.
         */
        hasChanges(state, getters) {
            return getters.hasProfileChanges || getters.hasPasswordChanges
        }
    },

    /**
     * @function mutations
     * @description
     * Defines methods that directly modify the state. Mutations are synchronous.
     */
    mutations: {
        /**
         * @function togglePasswordChange
         * @description
         * Toggles the visibility of the password change form (`showPasswordChange` state).
         * @param {object} state - The current state of the module.
         */
        togglePasswordChange(state) {
            state.showPasswordChange = !state.showPasswordChange
        },
        /**
         * @function toggleEdit
         * @description
         * Sets the `isEditing` state to `true` and hides the password change form.
         * This mutation is typically called when the user initiates editing of their profile.
         * @param {object} state - The current state of the module.
         */
        toggleEdit(state) {
            state.isEditing = true
            state.showPasswordChange = false
        },
        /**
         * @function resetPasswordData
         * @description
         * Clears the `currentPassword` and `newPassword` fields in `passwordData`.
         * This is useful after a password change attempt or when cancelling the password change.
         * @param {object} state - The current state of the module.
         */
        resetPasswordData(state) {
            state.passwordData.currentPassword = ''
            state.passwordData.newPassword = ''
        },
        /**
         * @function cancelEdit
         * @description
         * Exits edit mode (`isEditing` to `false`), hides the password change form,
         * and reverts `profileData` to its `originalData` if available.
         * @param {object} state - The current state of the module.
         */
        cancelEdit(state) {
            state.isEditing = false
            state.showPasswordChange = false

            if (state.originalData.name && state.originalData.email) {
                state.profileData.name = state.originalData.name
                state.profileData.email = state.originalData.email
            }
        },
        /**
         * @function updateUser
         * @description
         * Updates the `originalData` with the current `profileData` (persisting changes)
         * and stores the updated user object in `localStorage`.
         * This mutation is typically called after a successful profile update API call.
         * @param {object} state - The current state of the module.
         * @param {object} user - The updated user object received from the backend.
         */
        updateUser(state, user) {
            Object.assign(state.originalData, state.profileData)
            localStorage.setItem('user', JSON.stringify(user))
        },
        /**
         * @function initializeUser
         * @description
         * Initializes both `originalData` and `profileData` with the provided user object.
         * This is typically called when the user logs in or the application loads,
         * to set the initial profile state.
         * @param {object} state - The current state of the module.
         * @param {object} user - The user object containing `name` and `email`.
         */
        initializeUser(state, user) {
            if (!user || typeof user !== 'object') return
            const { name, email } = user
            if (!name || !email) return
            Object.assign(state.originalData, { name, email })
            Object.assign(state.profileData, { name, email })
        }
    },

    /**
     * @function actions
     * @description
     * Defines methods that can contain asynchronous operations and commit mutations.
     */
    actions: {
        /**
         * @function togglePasswordChange
         * @description
         * An action to toggle the password change form visibility.
         * If the form is being hidden, it also resets the password data.
         * @param {object} context - The Vuex context object, providing `commit` and `state`.
         */
        togglePasswordChange({ commit, state }) {
            commit('togglePasswordChange')
            if (!state.showPasswordChange) {
                commit('resetPasswordData')
            }
        },
        /**
         * @function toggleEdit
         * @description
         * An action to toggle the profile edit mode.
         * If currently editing, it cancels the edit (reverts data).
         * If not editing, it enables edit mode.
         * @param {object} context - The Vuex context object, providing `commit` and `state`.
         */
        toggleEdit({ commit, state }) {
            if (state.isEditing) {
                commit('cancelEdit')
            } else {
                commit('toggleEdit')
            }
        }
    }
}
