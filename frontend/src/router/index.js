import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import store from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // restore scroll when using back/forward
      return savedPosition
    }
    return { left: 0, top: 0, behavior: 'smooth' } // smooth scroll to top
  }
})

router.beforeEach((to, from, next) => {
  store.commit('setRouteMessage', `${to.name} PAGE`.toUpperCase())
  document.title = `AskJejo | ${to.name.charAt(0).toUpperCase() + to.name.slice(1)}`

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
