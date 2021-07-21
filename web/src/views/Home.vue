<template>
  <div>
    <swiper :options="swiperOptions" ref="promoslist" 
            @slide-change="() => promosActive = $refs.promoslist.$swiper.activeIndex">
      <swiper-slide>
        <img class="w-100 d-block" src="../assets/img/promos/promo1.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100 d-block" src="../assets/img/promos/promo2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100 d-block" src="../assets/img/promos/promo3.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100 d-block" src="../assets/img/promos/promo4.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100 d-block" src="../assets/img/promos/promo5.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    <div class="d-flex fs-xs text-center bg-lol-navbg">
      <span class="flex-1" 
            @click="$refs.promoslist.$swiper.slideTo(index)"
            :class="{bottom_nav_active:promosActive===index}"
            v-for="(item,index) in promosName" 
            :key="index">{{item}}</span>
    </div>
    <div class="nav-icons bg-lol-white mt-3 text-center pt-3 text-lol-dark-gray">
      <div class="d-flex flex-wrap" v-if="isNavShow">
        <div class="nav-item mb-3">
          <i class="sprite sprite-kf"></i>
          <div class="py-2">在线客服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-fhcx"></i>
          <div class="py-2">秩序殿堂</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-yxzl"></i>
          <div class="py-2">游戏资料</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-xgzd"></i>
          <div class="py-2">峡谷之巅</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-tft"></i>
          <div class="py-2">云顶之弈</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-101"></i>
          <div class="py-2">攻略中心</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-yz"></i>
          <div class="py-2">LOL宇宙</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-vxbd"></i>
          <div class="py-2">微信绑定</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-xsbb"></i>
          <div class="py-2">新手必备</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-lqzx"></i>
          <div class="py-2">领取中心</div>
        </div>
      </div>
      <div class="bg-lol-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="arrowUp mr-2"></i>
        <span @click="isNavShow = !isNavShow">收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
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

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
              tag="div"
              :to="`/heroes/${hero._id}`"
              class="p-2 fs-lg text-center" 
              v-for="(hero,index) in category.heroList" :key="index"
              style="width:20%">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.title}}</div>
          </router-link>
        </div>
        
      </template> 
    </m-list-card>
    <m-card icon="menu" title="赛事中心"></m-card>
  </div>
</template>

<script>
  import Swiper,{Navigation,Pagination} from 'swiper'
  import dayjs from 'dayjs'
  Swiper.use([Navigation,Pagination])
  export default {
    filters:{
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        promosName:['光明哨兵','光明之力','LPL赛程','哨兵通行证','英雄争霸赛'],
        promosActive:0,
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newsCats:[],
        heroCats:[],
        isNavShow:true
      }
    },
    methods: {
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      }
    },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
    },
  }
</script>

<style lang="less">
  @import url('../assets/css/_variables.less');
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
  .nav-icons{
    border-top: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
    .nav-item {
      width:25%;
      border-right: 1px solid @border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
  .arrowUp{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../assets/icons/arrowUp.png') no-repeat;
  }
</style>