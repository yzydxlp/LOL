<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back pr-2 text-lol-blue"></div> 
      <div class="flex-1 title text-lol-blue pr-2">
        {{model.title}}
      </div>
      <div class="text-lol-gray fs-sm">
        2019/07/01
      </div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>
    <div class="px-3 border-top py-2">
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
  </div>

</template>

<script>
  export default {
    name:'Article',
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
  
</style>
