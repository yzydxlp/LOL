<template>
  <div>
    <swiper :options="swiperOptions">
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
      <span class="flex-1 bottom_nav_active" >光明哨兵</span>
      <span class="flex-1">光明之礼</span>
      <span class="flex-1">LPL今日赛程</span>
      <span class="flex-1">哨兵通行证</span>
      <span class="flex-1">英雄争霸赛</span>
    </div>
  </div>
</template>

<script>
  import Swiper,{Navigation,Pagination} from 'swiper'
  Swiper.use([Navigation,Pagination])
  export default {
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          }
        }
      }
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
</style>