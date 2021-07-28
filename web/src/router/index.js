import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
const Home = ()=> import('../views/Home.vue')
const Article = ()=> import('../views/Article.vue')
const Hero = ()=> import('../views/Hero.vue')
const Strategy = ()=> import('../views/Strategy.vue')
const Competition = ()=> import('../views/Competition.vue')
const Community = ()=> import('../views/Community.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'main',
    component: Main,
    children: [
      {
        path:'/',
        name:'home',
        component:Home,
      },
      {
        path:'/articles/:id',
        name:'article',
        component:Article,
        props:true
      },
      {
        path:'/strategy',
        name:'strategy',
        component:Strategy
      },
      {
        path:'/competition',
        name:'competition',
        component:Competition
        
      },
      {
        path:'/my',
        name:'my',
        component:Community
        
      },
    ]
    
  },
  {
    path:'/heroes/:id',
    name:'hero',
    component:Hero,
    props:true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
