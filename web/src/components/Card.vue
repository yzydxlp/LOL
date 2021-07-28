<template>
  <!-- start of card -->
  <div class="card p-3 bg-lol-white mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2 title" :style="`color:${textc}`">
        {{title}}
      </div>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
    
  </div>
  <!-- end of card -->
</template>

<script>
  export default {
    name:'Card',
    props:{
      textc: {
        type:String,
        default () {
          return '#000'
        }
      },
      title: {
        type:String,
        default (){
          return ''
        },
        required:true
      },
      icon:{
        type:String,
        default(){
          return ''
        },
        required:true
      },
      plain: {
        type:Boolean
      }
    }
  }
</script>

<style scoped lang="less">
  @import url('../assets/css/_variables.less');
  .card{
    
    .card-header {
      border-bottom: 1px solid @border-color;
      
    }
    border-bottom: 1px solid @border-color;
    
  }
  .title {
    font-weight: bold;
  }
</style>