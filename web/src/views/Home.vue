<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="py-2 px-3 d-flex ai-center topbar" >
      <div slot="left">
        <img src="../assets/logo.png" alt="" height="30">
      </div>
      <div slot="center" class="d-flex">
        <div class="px-2 flex-1">
          <div class="text-lol-white">英雄联盟</div>
          <img src="../assets/slogan.png" alt="" height="10">
        </div>
      </div>
      <div slot="right">
        <button type="button" class="btn bg-lol-primary">立即下载</button>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scrollPosition="contenScroll">
      <!-- 轮播图 -->
      <home-swiper></home-swiper>
      <!-- 功能块 -->
      <home-icons></home-icons>
      
      <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link 
            tag="div"
            :to="`/articles/${news._id}`"
            class="py-2 fs-lg d-flex" 
            v-for="(news,index) in category.newsList" :key="index">
            <span class="text-lol-dark-blue">[{{news.categoriesName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-lol-dark-gray text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-lol-gray fs-sm mx-1">{{news.createdAt | date}}</span>
          </router-link>
        </template> 
      </m-list-card>
      <!-- 英雄卡片展示 -->
      <hero-card :heroes="heroCats"></hero-card>
      <!-- <m-card icon="menu" title="赛事中心"></m-card> -->
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script >
  import dayjs from 'dayjs'
  import NavBar from '../components/common/navbar/NavBar.vue'
  import HomeSwiper from './HomeSwiper.vue'
  import HomeIcons from './HomeIcons.vue'
  import HeroCard from '../components/content/heroes/HeroCard.vue'
  import Scroll from '../components/common/scroll/Scroll.vue'
  import BackTop from '../components/content/backTop/BackTop.vue'
  import '../assets/css/style.css'

  export default {
    activated() {
      // console.log(this.saveY)
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,10)
      
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    components: { NavBar,HomeSwiper, HomeIcons, HeroCard, Scroll, BackTop },
    filters:{
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        promosActive:0,
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newsCats:[],
        heroCats:[],
        isNavShow:true,
        isShowBackTop:false,
        saveY:0
      }
    },
    methods: {
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
        // console.log('----')
      },
      contenScroll(position){
        // console.log(position)
        this.isShowBackTop = position.y<=-500
      },
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      },
    },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
    },
  }
</script>

<style lang="less" scoped>
  @import url('../assets/css/_variables.less');
  #home {
    height: 100vh;
  }
  .content {
    height:calc(100% - 7.1538rem)
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .bottom_nav_active {
    color: #ab8e66;
    background-color: #f7f6f6;
    border-bottom: 2px #cea861 solid;
  }
  .pagination-home {
    .swiper-pagination-bullet{
      border-radius: 0.1538rem;
      background: #fff;
      &.swiper-pagination-bullet-active{
        background-color: #19647e;
      }
    }
  }
</style>