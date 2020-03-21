// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import VueAxios from 'vue-axios'
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import 'bootstrap'

import App from './App'
import Vue from 'vue'
import router from './router'
import './bus'

Vue.use(VueAxios, axios)
Vue.component('Loading',Loading)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // console.log(to,from,next)
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then(response => {
      console.log(response.data)
      if(response.data.success){
        next()
      }else{
        next({
          path:"/login"
        })
      }
    });  
  }else{
    next()
  }

  
})
