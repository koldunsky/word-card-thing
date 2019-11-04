import Vue from 'vue'
import Router from 'vue-router'
import Add from './pages/Add/index.vue'
import Drill from './pages/Drill/index.vue'
import List from './pages/List/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'add',
      component: Add
    },
    {
      path: '/drill',
      name: 'drill',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Drill
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
