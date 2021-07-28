<template>
  <div>
    <swiper :promos="promos">
      <swiper-item v-for="(item, index) in promos" :key="index">
        <a :href="item.url">
          <img :src="item.image" :alt="item.title">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../components/common/swiper'
export default {
  name:'HomeSwiper',
  components: {Swiper, SwiperItem },
  data() {
    return {
      promos:[]
    }
  },
  methods: {
    async fetchPromos(){
        const res = await this.$http.get('promos/list')
        this.promos = res.data.items;

      }
  },
  created() {
    this.fetchPromos()
  },
}
</script>

<style>

</style>