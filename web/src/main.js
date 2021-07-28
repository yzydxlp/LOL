import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';

Vue.use(Vant);


Vue.config.productionTip = false

import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vant/lib/index.css';
import './assets/css/reset.css'
import './assets/css/style.less'
import 'swiper/swiper-bundle.css'
import './assets/icons/iconfont.css'

Vue.use(VueAwesomeSwiper)

import Card from './components/Card.vue'
Vue.component('m-card',Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api'
  // baseURL:'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
