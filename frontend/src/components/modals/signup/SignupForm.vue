<template>
    <!-- Success/Error message after signup -->
    <div v-if="result" class="signupmodal__message" :class="result?.success ? 'success' : 'error'" aria-live="polite"
        @click.prevent="result = null">
        {{ result?.message }}
    </div>

    <!-- Validation or network error -->
    <div v-if="error && !result" class="signupmodal__message error" aria-live="polite" @click.prevent="error = null">
        {{ error }}
    </div>
    <form class="signupmodal__form" autocomplete="off" @submit.prevent="signupNow">
        <div class="signupmodal__field">
            <label for="signup-email" class="signupmodal__label">Email</label>
            <input id="signup-email" type="email" class="signupmodal__input" v-model="signup.email"
                placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-fullname" class="signupmodal__label">Full Name</label>
            <input id="signup-fullname" type="text" class="signupmodal__input" v-model="signup.name"
                placeholder="Enter your full name" required autocomplete="name" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-password" class="signupmodal__label">Password</label>
            <input id="signup-password" type="password" class="signupmodal__input" v-model="signup.password"
                placeholder="Create a password" required autocomplete="new-password" />
        </div>
        <div class="signupmodal__field">
            <label for="signup-confirm" class="signupmodal__label">Confirm Password</label>
            <input id="signup-confirm" type="password" class="signupmodal__input" v-model="confirm_password"
                placeholder="Confirm your password" required autocomplete="new-password" />
        </div>
        <button type="submit" class="signupmodal__button" aria-label="Sign up">Sign Up</button>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const state = store.state
const signup = ref({
    email: '',
    name: '',
    password: ''
})

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
}

const confirm_password = ref('')
const result = ref(null)
const error = ref(null)

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

const clearForm = () => {
    for (const key in signup.value) {
        if (Object.prototype.hasOwnProperty.call(signup.value, key)) {
            signup.value[key] = ''
        }
    }
    confirm_password.value = ''
    error.value = null
    result.value = null
}

const signupNow = async () => {
    error.value = null
    result.value = null

    // Basic validation
    if (!signup.value.name.trim()) {
        error.value = 'Name is required'
        return
    }

    if (!isValidEmail(signup.value.email)) {
        error.value = 'Invalid email format'
        return
    }

    if (!signup.value.password || signup.value.password.length < 6) {
        error.value = 'Password must be at least 6 characters'
        return
    }

    if (signup.value.password !== confirm_password.value) {
        error.value = 'Passwords do not match'
        return
    }

    try {
        state.loading = true
        const res = await store.dispatch('signup', {
            name: signup.value.name,
            email: signup.value.email,
            password: signup.value.password,
            password_confirmation: confirm_password
        })

        result.value = res
        if (res.success) {
            clearForm()
            toggleModal()
        } else {
            error.value = res.message
        }
    } catch (err) {
        console.error('Signup failed:', err)
        error.value = err?.message || 'Something went wrong, please try again.'
    } finally {
        state.loading = false
    }
}
</script>