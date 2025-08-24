
import HomeView from '../views/HomeView.vue'


export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresGuest: true },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: { requiresGuest: true },
    },
    {
        path: '/ask',
        name: 'ask',
        component: () => import('../views/AskView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { requiresAuth: true },
    }
]