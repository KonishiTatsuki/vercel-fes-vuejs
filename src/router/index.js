import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rogin',
    name: 'rogin',
    // route level code-splitting
    // this generates a separate chunk (rogin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "rogin" */ '../views/RoginView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (cart.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    // route level code-splitting
    // this generates a separate chunk (pay.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pay" */ '../views/PayView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
