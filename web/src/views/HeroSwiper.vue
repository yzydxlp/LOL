<template>
  <div>
    <swiper :isShowindicator="false">
          <swiper-item 
            v-for="(img,index) in skins" :key="index">
            <img :src="img" class="skinsimg" alt="">
          </swiper-item>
        </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../components/common/swiper'
export default {
  name:'HeroSwiper',
  components: {Swiper, SwiperItem },
  props:{
    skins:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style>
.skinsimg{
  width:100%
}
</style>