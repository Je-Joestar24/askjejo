<template>
    <div v-if="result" class="loginmodal__message" :class="result?.success ? 'success' : 'error'" aria-live="polite"
        @click.prevent="result = null">
        {{ result?.message }}
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
import { useStore } from 'vuex';

const store = useStore()
const state = store.state
const login_form = ref({ email: '', password: '' })
const result = ref(null)

const toggleModal = (active = '') => {
    store.dispatch('setActiveModal', active)
}

const loginNow = async () => {

    try {
        state.loading = true
        const res = await store.dispatch('login', {
            email: login_form.value.email,
            password: login_form.value.password
        })

        result.value = res
        if (res.success) {
            toggleModal()
        } else {
            error.value = res.message
        }
    } catch (err) {
        console.error('Login failed:', err)
    } finally {
        state.loading = false
    }
}
</script>