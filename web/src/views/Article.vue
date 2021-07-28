<template>
  <div class="page-article" v-if="model">
    <nav-bar class="py-2 px-3 d-flex ai-center topbar" >
       <div slot="left">
        <img src="../assets/logo.png" alt="" height="30">
      </div>
      <div slot="center" class="d-flex">
        <div class="px-2 flex-1">
          <div class="text-lol-white">英雄联盟</div>
          <img src="../assets/slogan.png" alt="" height="10">
        </div>
      </div>
      <div slot="right">
        <button type="button" class="btn bg-lol-primary">立即下载</button>
      </div>
    </nav-bar>
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link to="/" tag="div" class="fs-xs">
        <div class="iconfont icon-back pr-2 text-lol-blue"></div>
      </router-link>
       
      <div class="flex-1 title text-lol-blue pr-2">
        {{model.title}}
      </div>
      <div class="text-lol-gray fs-sm">
        2019/07/01
      </div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>
    <div class="px-3 border-top py-2 pb-5">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <span class="text-lol-blue fs-lg title ml-2 py-2">相关资讯</span>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-2"
          :to="`/articles/${item._id}`"
          tag="div" 
          v-for="item in model.related" :key="item._id">
          {{item.title}}
          </router-link>
      </div>
    </div>
    <back-btn @click.native="$router.go(-1)"></back-btn>
  </div>

</template>

<script>
import NavBar from '../components/common/navbar/NavBar.vue'
import BackBtn from '../components/content/backBtn/BackBtn.vue'
  export default {
    name:'Article',
    components:{
      NavBar,
      BackBtn
    },
    data() {
      return {
        model:{}
      }
    },
    props: {
      id: {
        required:true
      }
    },
    watch:{
      id:'fetch'
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`articles/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.fetch()
    },

  }
</script>

<style lang="less" scoped>
@import url('../assets/css/_variables.less');
  .title {
    font-weight: bold;
  }
  .page-article{
    .article-body {
    /deep/ img {
      width: 100%;
    }  
  }
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
