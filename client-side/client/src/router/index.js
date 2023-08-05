import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'home' && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'detail' && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'favorite' && !isAuthenticated) {
    next({ name: 'login' })
  } else next()
})

export default router
