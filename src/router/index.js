import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Search from '@/components/Search'
import Profile from '@/components/Profile'
import SignUpPage from '@/components/SignUpPage'
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
      path: '/search/:query',
      name: 'Search',
      component: Search,
      props: true
    },
    {
      path: '/profile/:userid',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/signuppage/:firstName&:lastName&:email',
      name: 'SignUpPage',
      component: SignUpPage,
      props: true
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
