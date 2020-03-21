import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/dashboard'
import Products from '@/components/products'
import Login from '@/components/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'login'
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children:[
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})
