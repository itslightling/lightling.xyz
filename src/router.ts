import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from './views/Home/Home.vue'

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
