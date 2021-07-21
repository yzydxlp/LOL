<template>
  <div class="page-hero" v-if="model">
   <div class="topbar bg-lol-black py-2 px-3 d-flex ai-center text-lol-white">
      <img src="../assets/logo.png" alt="" height="30">
      <div class="px-2 flex-1">
        <!-- flex-1表示自己会变大，把左右撑开占满一格 -->
        <span class="text-lol-white">英雄联盟</span>
        <span class="ml-2 fs-sm">攻略站</span>
      </div>
      <router-link to="/" tag="div" class="fs-xs">更多英雄 &gt;</router-link>
    </div>
    <div class="top">
      <swiper>
        <swiper-slide 
          v-for="(img,index) in model.skins" :key="index">
          <img :src="img" class="w-100" alt="">
        </swiper-slide>
      </swiper>

      <div class="info d-flex text-lol-white flex-column px-2" v-if="model.scores">
        <span class="fs-lg py-1">{{model.title}}</span>
        <span class="fs-xxl py-2">{{model.name}}</span>
        <div class="d-flex">
          <span 
            class="tags my-3"
            v-for="(item,index) in model.categories.map(v=>v.name)" :key="index">{{item}}</span>
        </div>
        <div class="d-flex jc-between">
          <dl class="defail-stat">
            <dt>物理攻击</dt>
            <dd>
              <i class="up up1" :style="style1"></i>
            </dd>
            <dt>魔法攻击</dt>
            <dd>
              <i class="up up2" :style="style2"></i>
            </dd>
            <dt>防御能力</dt>
            <dd>
              <i class="up up3" :style="style3"></i>
            </dd>
            <dt>上手难度</dt>
            <dd>
              <i class="up up4" :style="style4"></i>
            </dd>
          </dl>
        </div> 
      </div>

      <span class="sbg"></span>
    </div>
    <!-- end of top -->
    <div>
      <div class="px-3 bg-lol-white">
        <div class="nav d-flex pb-2 pt-3 border-bottom jc-around">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slider class="w-100">
          <div>
            <div class="p-3 bg-lol-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-shipin"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-shipin"></i>
                  英雄介绍视频
                </router-link>
              </div>
              <div class="skills mt-4">
                <div class="d-flex jc-around">
                  <img 
                    :src="item.icon" 
                    v-for="(item,index) in model.skills" :key="index" 
                    alt=""
                    class="skills-icon"
                    :class="{activeSkillIcon: currentSkillIndex===index}"
                    width="60"
                    @click="currentSkillIndex=index"
                  >
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-3 pb-2">
                    <div class="mr-3 fs-lg" style="font-weight:bold">{{currentSkill.name}}</div>
                    <span class="text-lol-gray">{{currentSkill.position}}</span>
                  </div>
                  <p class="fs-sm">{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                </div>
              </div>
            </div>
            <m-card plain textc="#338c7a" icon="iconintroduce01" title="背景故事" class="background-story">
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.background}}</p>
            </m-card>
            <m-card plain textc="#338c7a" icon="card-hero" title="使用技巧" class="background-story">
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.allyTip}}</p>
            </m-card>
            <m-card plain textc="#338c7a" icon="card-hero" title="对抗技巧" class="background-story">
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.enemyTip}}</p>
            </m-card>
          </div>
        </swiper-slider>
        <swiper-slider></swiper-slider>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name:'Hero',
  props: {
    id: {
      required:true
    }
  },
  computed: {
    style1(){
      return "width:" +this.model.scores.physicalDamage*10 + "%"
    },
    style2(){
      return "width:" +this.model.scores.magicDamage*10 + "%"
    },
    style3(){
      return "width:" +this.model.scores.defensiveCapability*10 + "%"
    }
    ,style4(){
      return "width:" +this.model.scores.difficult*10 + "%"
    },
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  data() {
    return {
      model: {},
      currentSkillIndex:0
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="less">
  

  .skills-icon {
    border-radius: 20%;
    border:3px solid #fff;
    &.activeSkillIcon {
      border-color:#ee964b
    }
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .top {
    .tags {
      width: 35px;
      height: 18px;
      line-height: 18px;
      margin-right: 5px;
      text-align: center;
      background: #00a483;
      border-radius: 5px;
    }
    .info {
      position: absolute;
      z-index: 2;
      float: left;
      top: 50px;
    }
    .sbg {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 233px;
      z-index: 1;
      background: #000;
      opacity: .6;
    }
  }
  .defail-stat {
    // margin-top: 25px;
    height: 80px;
    width: 150px;
    display: block;
    // margin-block-start: 1em;
    // margin-block-end: 1em;
    // margin-inline-start: 0px;
    // margin-inline-end: 0px;
    dt {
      float: left;
      width: 40%;
      margin-bottom: 5px;
      height: 16px;
      line-height: 16px;
    }
    dd {
      display: block;
      margin-inline-start: 40px;
      float: left;
      width: 60%;
      margin: 2px 0 7px;
      height: 12px;
      background: #363c3c;
    i {
    font-style: italic;
    }
    .up {
      display:block;
      height: 12px;
    }
    .up1{
      background: #f2c500;
    }
    .up2{
      background: #f59d00;
    }
    .up3{
      background: #2c97de;
    }
    .up4{
      background: #1eca6b;
    }
  }
    
  }
  
</style>