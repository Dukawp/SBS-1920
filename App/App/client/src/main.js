import "font-awesome/css/font-awesome.css"

import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import router from "./components/config/router"

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  BootstrapVue,
  router,
  render: h => h(App),
}).$mount('#app')