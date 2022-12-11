import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

import Home from './views/Home/Home.vue'
import Places from './views/Places/Places.vue'

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/places',
    component: Places,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
