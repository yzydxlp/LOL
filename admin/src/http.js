import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/admin/api', 
  // baseURL:'http://localhost:3000/admin/api'
})
// Add a request interceptor
//请求拦截，为每个请求带上相应的参数，如token
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token ||'')
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
//响应拦截，对于返回的信息进行判断，如果返回状态为401，即请求用户验证
http.interceptors.response.use(res => {
  return res
},err => {
  if(err.response.data.message){
    Vue.prototype.$message.error(err.response.data.message)
    if(err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})
export default http