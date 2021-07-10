<template>
  <div>
    <div class="topbar bg-lol-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30">
      <div class="px-2 flex-1">
        <!-- flex-1表示自己会变大，把左右撑开占满一格 -->
        <div class="text-lol-white">英雄联盟</div>
        <!-- <div class="text-lol-gray fs-xs">不负好时光</div> -->
        <img src="../assets/slogan.png" alt="" height="10">
      </div>
      <button type="button" class="btn bg-lol-primary">立即下载</button>
    </div>
    <div class="bg-lol-primary py-3">
      <div class="nav d-flex text-lol-light jc-around">
        <div class="nav-item active">
          <router-link tag="div" to="/" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">赛事中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/" class="nav-link">社区</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>