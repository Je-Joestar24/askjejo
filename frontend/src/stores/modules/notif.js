/**
 * @module AskJejo/NotifStore
 * @description
 * This Vuex module (`notif.js`) manages the state for global notifications or alerts
 * within the AskJejo application. It provides a centralized way to display
 * temporary messages to the user, such as success messages, error alerts, or
 * informational notices.
 *
 * The store holds the type and content of the current notification, allowing
 * components to trigger and display these messages consistently across the application.
 */
export default {
    /**
     * @property {boolean} namespaced - Indicates that this module is namespaced.
     * This means its state, getters, mutations, and actions will be accessed via `notif/`.
     */
    namespaced: true,

    /**
     * @function state
     * @description
     * Defines the initial state for the 'notif' module.
     * @returns {object} The initial state object.
     */
    state: () => ({
        /**
         * @property {string} type - The type of the notification (e.g., 'success', 'error', 'info', 'warning').
         * This can be used to apply specific styling or icons to the notification.
         * Initial value is an empty string.
         */
        type: '',
        /**
         * @property {string} message - The actual message content to be displayed in the notification.
         * Initial value is an empty string.
         */
        message: ''
    }),

    /**
     * @function mutations
     * @description
     * Defines methods that directly modify the state. Mutations are synchronous.
     */
    mutations: {
        /**
         * @function setMessage
         * @description
         * Sets or clears the notification message and its type.
         * If `payload` is null or undefined, the notification is cleared.
         * Otherwise, it updates the `type` and `message` properties of the state.
         * @param {object} state - The current state of the module.
         * @param {object|null} payload - An object containing `type` (string) and `message` (string)
         *                                  for the notification, or `null` to clear the notification.
         * @example
         * // To set a success message:
         * commit('notif/setMessage', { type: 'success', message: 'Operation completed successfully!' });
         *
         * // To clear the message:
         * commit('notif/setMessage', null);
         */
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
