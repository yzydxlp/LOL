<template>
  <div class="d-flex flex-wrap itemcardwrap " style="margin:0 -0.5rem">
    <div class="p-1 fs-lg text-center itemcard">
      <img :src="icon" alt="" class="w-100 itemimg">
      <div>{{name}}</div>
    </div>
  </div>
</template>
<script>
import '../assets/css/style.less'
export default {
  props: {
    icon:{
      type:String,
      default(){
        return ''
      }
    },
    name:{
      type:String,
      default(){
        return ''
      }
    }
  }
}
</script>
<style scoped>
  .itemimg{
    /* display:inline-block */
    border-radius: 25%;
  }
  .itemcard{
    width: 100%;  
    font-weight: bold;
    
    /* font-size: 13px; */
  }
  .itemcardwrap{
    width: 25%;
  }
  
</style>