// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import SearchList from '../views/SearchList.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/search', name: 'Search', component: SearchList },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
