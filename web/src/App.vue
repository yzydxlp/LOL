<template>
  <div id="app">
    <keep-alive exclude="Hero">
      <router-view></router-view>
    </keep-alive>
   
    <main-tab-bar class="tabbar"></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from '../src/components/content/mainTabbar/MainTabBar.vue'
  export default {
    components: {
      MainTabBar
    }
  }
</script>
<style lang="less">
  .tabbar{
    position: sticky;
    bottom: 0;
    z-index: 999;
  }
</style>
