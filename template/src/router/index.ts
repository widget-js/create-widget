import { createRouter, createWebHashHistory } from 'vue-router'
import WidgetRouter from '../widgets/widget-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...WidgetRouter,
    {
      path: '/',
      component: () => import('@/Home.vue'),
    },
  ],
})

export default router
