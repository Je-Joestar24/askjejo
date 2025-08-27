import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import store from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.commit('setRouteMessage',`${to.name} PAGE`.toUpperCase()) 

  // Check localStorage for authentication
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const isAuthenticated = token && user

  // Check if route requires authentication
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  if (requiresAuth && !isAuthenticated) {
    // Route requires auth but user not authenticated, redirect to home
    return next({ name: 'home' })
  }

  if (requiresGuest && isAuthenticated) {
    // Route requires guest but user is authenticated, redirect to ask
    return next({ name: 'ask' })
  }

  // Continue navigation
  next()
})

export default router
