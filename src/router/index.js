import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
