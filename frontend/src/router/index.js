import { createRouter, createWebHistory } from 'vue-router'
import PostView from '../views/PostView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewPost from '../views/NewPost.vue'

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
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/post/:id',
    name: 'posts',
    component: PostView
  },
  {
    path: '/post/',
    name: 'newpost',
    component: NewPost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name !== 'login' && to.name !== 'signup') && !localStorage.getItem('token')) {
    next({ name: 'login' })
  }
  else next()
})

export default router
