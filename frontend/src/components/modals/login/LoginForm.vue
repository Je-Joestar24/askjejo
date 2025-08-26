<template>
    <!-- Success/Error message after login -->
    <div v-if="result" class="loginmodal__message" :class="result?.success ? 'success' : 'error'" aria-live="polite"
        @click.prevent="result = null">
        {{ result?.message }}
    </div>

    <!-- Validation or network error -->
    <div v-if="error && !result" class="loginmodal__message error" aria-live="polite" @click.prevent="error = null">
        {{ error }}
    </div>

    <form class="loginmodal__form" autocomplete="off" @submit.prevent="loginNow">
        <div class="loginmodal__field">
            <label for="login-email" class="loginmodal__label">Email</label>
            <input id="login-email" type="email" v-model="login_form.email" class="loginmodal__input"
                placeholder="Enter your email" required autocomplete="username" />
        </div>
        <div class="loginmodal__field">
            <label for="login-password" class="loginmodal__label">Password</label>
            <input id="login-password" type="password" v-model="login_form.password" class="loginmodal__input"
                placeholder="Enter your password" required autocomplete="current-password" />
        </div>
        <button type="submit" class="loginmodal__button" aria-label="Login">Login</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const state = store.state
const login_form = ref({ email: '', password: '' })
const result = ref(null)
const error = ref(null)

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
}

const clearForm = () => {
    login_form.value.email = ''
    login_form.value.password = ''
    error.value = null
    result.value = null
}

const loginNow = async () => {
    error.value = null
    result.value = null

    // Basic validation
    if (!login_form.value.email.trim()) {
        error.value = 'Email is required'
        return
    }

    if (!login_form.value.password) {
        error.value = 'Password is required'
        return
    }

    try {
        state.loading = true
        const res = await store.dispatch('login', {
            email: login_form.value.email,
            password: login_form.value.password
        })

        result.value = res
        if (res.success) {
            clearForm()
            store.commit('setMessage', { message: res.message, type: 'success' })
            store.dispatch('initialize')
            router.push({ name: 'ask' })
            toggleModal()
        } else {
            error.value = res.message
            store.commit('setMessage', { message: res.message, type: 'error' })
        }
    } catch (err) {
        console.error('Login failed:', err)
        error.value = err?.message || 'Something went wrong, please try again.'
        store.commit('setMessage', { message: res.err?.message || 'Something went wrong, please try again.', type: 'error' })
    } finally {
        state.loading = false
    }
}
</script>