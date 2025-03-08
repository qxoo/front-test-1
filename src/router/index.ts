import { createRouter, createWebHistory } from 'vue-router'
import AccountsPage from '../views/AccountsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccountsPage,
    },
  ],
})

export default router
