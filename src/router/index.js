import { createRouter, createWebHistory } from 'vue-router'
import Watsdinner from '../views/Watsdinner.vue'
import QuestionSetting from '../views/QuestionSetting.vue'

const routes = [
  {
    path: '/',
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
