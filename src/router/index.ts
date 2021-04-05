import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/poll/Settings.vue'
import Vote from '../views/poll/Vote.vue'
import Results from '../components/Results.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/poll/:pollId/settings',
    name: 'Settings',
    props: true,
    component: Settings
  },
  {
    path: '/poll/:pollId/vote',
    name: 'Vote',
    props: true,
    component: Vote
  },
  {
    path: '/poll/:pollId/results',
    name: 'Results',
    props: true,
    component: Results
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
