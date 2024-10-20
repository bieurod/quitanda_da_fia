import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import SearchResult from '../views/SearchResult.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/carrinho',
    name: 'carrinho',
    component: ShoppingCart
  },
  {
    path: '/buscar',
    name: 'buscar',
    component: SearchResult
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
