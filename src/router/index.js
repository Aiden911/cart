import { createRouter, createWebHashHistory } from 'vue-router'  // 改為 HashHistory
import ShoppingCart from '../views/ShoppingCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ShoppingCart
  }
]

const router = createRouter({
  history: createWebHashHistory(),  // 改用 hash 模式，移除 BASE_URL
  routes
})

export default router