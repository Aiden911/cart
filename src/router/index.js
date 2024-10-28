import { createRouter, createWebHashHistory } from 'vue-router'
import ShoppingCart from '../views/ShoppingCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ShoppingCart
  }
]

const router = createRouter({
  history: createWebHashHistory('/cart/'),  // 添加基礎路徑
  routes
})

export default router