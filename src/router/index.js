import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/city',
    name: 'City',
    component: City
  }, {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }],
  // 拖动多个页面默认会互相影响，所以我们需要跳转每个页面的初始值x,y为0，也就是页面从最顶部开始展示
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
