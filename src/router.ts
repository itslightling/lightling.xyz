import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from './views/Home/Home.vue'

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
