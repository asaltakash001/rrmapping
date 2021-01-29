import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/services.vue')
  },
  {
    path: '/enquiry',
    name: 'Enquiry',
    component: () => import('../views/Enquiry.vue')
  },
  {
    path: '/career',
    name: 'Career',
    component: () => import('../views/Career.vue'),
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('../views/about.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



