import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach((to, from, next) => {
//   if ((to.name !== 'login' && to.name !== 'signup') && !localStorage.getItem('token')) {
//     next({ name: 'login' })
//   }
//   else next()
// })

export default router
