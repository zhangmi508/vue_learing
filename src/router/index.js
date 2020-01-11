import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'

import '../assets/css/global.css'
import '../assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.198.131:8888/api/private/v1/'
/* 挂载到vue对象上,每个组件都可以用 */
Vue.prototype.$http = axios

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
