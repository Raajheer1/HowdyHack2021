import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Overview from '@/views/VideoGrid'
import VideoPlayer from "@/views/VideoPlayer"
import Assets from '@/views/AssetGrid'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets
  },
  {
    path: '/stream',
    name: 'stream',
    component: VideoPlayer,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
