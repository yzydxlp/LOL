<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM:true,
      click:true,
      observeImage:true,
      probeType:this.probeType
    })
    this.scroll.on('scroll',position=>{
      // console.log(position)
      this.$emit('scrollPosition',position)
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll&&this.scroll.scrollTo&& this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll&&this.scroll.scrollTo&& this.scroll.refresh()
    }
  },  
}
</script>

<style>

</style>