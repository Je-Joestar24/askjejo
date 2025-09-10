export default {
    namespaced: true,
    state: () => ({
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
    }),
    getters: {
        hasProfileChanges(state) {
            return (
                state.profileData.name !== state.originalData.name ||
                state.profileData.email !== state.originalData.email
            )
        },
        hasPasswordChanges(state) {
            return state.showPasswordChange && state.passwordData.newPassword.length > 0
        },
        hasChanges(state, getters) {
            return getters.hasProfileChanges || getters.hasPasswordChanges
        }
    },
    mutations: {
        togglePasswordChange(state) {
            state.showPasswordChange = !state.showPasswordChange
        },
        toggleEdit(state) {
            state.isEditing = true
            state.showPasswordChange = false
        },
        resetPasswordData(state) {
            state.passwordData.currentPassword = ''
            state.passwordData.newPassword = ''
        },
        cancelEdit(state) {
            state.isEditing = false
            state.showPasswordChange = false

            if (state.originalData.name && state.originalData.email) {
                state.profileData.name = state.originalData.name
                state.profileData.email = state.originalData.email
            }
        },
        updateUser(state, user) {
            Object.assign(state.originalData, state.profileData)
            localStorage.setItem('user', JSON.stringify(user))
        },
        initializeUser(state, user) {
            if (!user || typeof user !== 'object') return
            const { name, email } = user
            if (!name || !email) return
            Object.assign(state.originalData, { name, email })
            Object.assign(state.profileData, { name, email })
        }
    },
    actions: {
        togglePasswordChange({ commit, state }) {
            commit('togglePasswordChange')
            if (!state.showPasswordChange) {
                commit('resetPasswordData')
            }
        },
        toggleEdit({ commit, state }) {
            if (state.isEditing) {
                commit('cancelEdit')
            } else {
                commit('toggleEdit')
            }
        }
    }
}
