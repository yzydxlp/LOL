<template>
  <tab-bar>
      <tab-bar-item path="/" activeColor='#ee964b'>
        <img src="../../../assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="../../../assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/strategy" activeColor='#ee964b'>
        <img src="../../../assets/img/tabbar/gonglve.svg" alt="" slot="item-icon">
        <img src="../../../assets/img/tabbar/gonglve_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">攻略中心</div>
      </tab-bar-item>
      <tab-bar-item path="/competition" activeColor='#ee964b'>
        <img src="../../../assets/img/tabbar/saishi.svg" alt="" slot="item-icon">
        <img src="../../../assets/img/tabbar/saishi_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">赛事中心</div>
      </tab-bar-item>
      <tab-bar-item path="/my" activeColor='#ee964b'>
        <img src="../../../assets/img/tabbar/shequ.svg" alt="" slot="item-icon">
        <img src="../../../assets/img/tabbar/shequ_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我</div>
      </tab-bar-item>
    </tab-bar>
    
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar.vue"
  import TabBarItem from "../../common/tabbar/TabBarItem.vue"
  export default {
    name:"MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>
<style scoped>
  
</style>