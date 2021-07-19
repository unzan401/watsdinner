import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Watsdinner from '../views/Watsdinner.vue'
import QuestionSetting from '../views/QuestionSetting.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/watsdinner',
    name: 'Watsdinner',
    component: Watsdinner
  },
  {
    path:'/QuestionSetting',
    name: 'QuestionSetting',
    component: QuestionSetting
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
