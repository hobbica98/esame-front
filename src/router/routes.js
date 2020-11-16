import store from '../store'
import MainHeader from '../components/mainHeader'
import LeftSidebar from '../components/LeftSidebar'
import dashboard from '../pages/Dashboard.vue'

import { leftSidebarItems } from '../_nav'

const loginRoute = {
  path: 'login',
  name: 'login',
  component: () => import('layouts/Login.vue')
}

const SimpleLayout = {
  components: {
    default: dashboard,
    header: MainHeader,
    leftsidebar: LeftSidebar
  },
  props: {
    header: { colorOnScroll: 65 },
    leftsidebar: { leftSidebarItems: leftSidebarItems, leftDrawerOpen: false }
  }
}

export const mainRoute = {
  name: 'Start',
  path: '/',
  redirect: '/dashboard',
  beforeEnter (to, from, next) {
    if (!store.state.userData.jwt) {
      return next('/login')
    }
    next()
  },
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      components: SimpleLayout.components,
      props: SimpleLayout.props
    }
  ]
}
const routes = [
  {
    path: '/',
    component: {
      render (c) {
        return c('router-view')
      }
    },
    children: [loginRoute, mainRoute]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]
export default routes
