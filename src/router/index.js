import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user',
      name: 'user-list',
      component: () => import('@/views/user/list.vue')
    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: () => import('@/views/user/detail.vue')
    }
  ],
})

export default router
