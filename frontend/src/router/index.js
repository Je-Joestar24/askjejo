import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
/* 
router.beforeEach((to, from, next) => {

  const name = `${to.name?.toString()} Page`

  if (requiresAuth && !logged_user.value) {
    // Redirect to home if not authenticated
    return next({ name: 'home' })
  }
  if (to.meta.requiresGuest && logged_user.value) {
    return next('/search') // or redirect to dashboard
  }

  // Continue navigation
  next()
})
 */

export default router
