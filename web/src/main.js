import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/css/style.less'
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
