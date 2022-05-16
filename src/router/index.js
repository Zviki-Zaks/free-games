import { createRouter, createWebHashHistory } from 'vue-router'
import GameApp from '../views/GameApp.vue'
import GameDetails from '../views/GameDetails.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameApp
    },
    {
      path: '/game/:id',
      name: 'gameDetails',
      component: GameDetails
    },
  ]
})

export default router
