<template>
  <div class="page-hero" v-if="model">
    <nav-bar class="ai-center py-2 px-3 heronav">
      <div slot="left">
        <img src="../assets/logo.png" height="30px" alt="">
      </div>
      <div slot="center" class="text-lol-white  ml-5 d-flex">
        <div v-for="(item,index) in titles" :key="index" class="flex-1">{{item}}</div>
      </div>
    </nav-bar>

    <div class="top">
      <div class="skins-wrap">
        <hero-swiper :skins="model.skins"></hero-swiper>
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
      </div>
      <!-- end of skins-wrap -->
    </div>
    <!-- end of top -->
    <div class="w-100">
      <div class="px-3 bg-lol-white">
        <div class="nav d-flex pb-2 pt-3 border-bottom jc-around">
          <div class="nav-item" v-for="(item,index) in swiperspans" :key="index"
              :class="{active:promosActive===index}"
              @click="$refs.infolist.$swiper.slideTo(index)">
            <div class="nav-link">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <swiper  ref="infolist"
          @slide-change="() => promosActive = $refs.infolist.$swiper.activeIndex">
      <swiper-slide>
        <div>
          <div class="p-3 bg-lol-white border-bottom">
            <div class="skilltitle fs-xl border-bottom pb-3">
              <i class="iconfont icon-jinengdian" ></i>
              技能介绍
            </div>
            <div class="skills mt-4">
              <div class="d-flex jc-around">
                <img 
                  :src="item.icon" 
                  v-for="(item,index) in model.skills" :key="index" 
                  alt=""
                  class="skills-icon"
                  :class="{activeSkillIcon: currentSkillIndex===index}"
                  width="60px"
                  @click="currentSkillIndex=index"
                >
              </div>
              <div v-if="model.skills">
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
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="fs-lg pb-5">  
          <m-card plain textc="#338c7a" icon="card-hero" title="使用技巧" class="background-story">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.allyTip}}</p>
          </m-card>
          <m-card plain textc="#338c7a" icon="card-hero" title="对抗技巧" class="background-story">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.enemyTip}}</p>
          </m-card>
          <m-card plain textc="#338c7a" icon="card-hero" title="出装推荐" class="background-story">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{model.enemyTip}}</p>
          </m-card>
        </div>
      </swiper-slide>
    </swiper>
    <back-btn @click.native="$router.go(-1)"></back-btn>
  </div>
</template>

<script>
import NavBar from '../components/common/navbar/NavBar.vue'
import BackBtn from '../components/content/backBtn/BackBtn.vue'
import HeroSwiper from './HeroSwiper.vue'
export default {
  components: { BackBtn, NavBar, HeroSwiper},
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
      if(this.model.skills.length!==0){
        return this.model.skills[this.currentSkillIndex]
      }
      return {}
    }
  },
  data() {
    return {
      model: {},
      currentSkillIndex:0,
      swiperspans:['英雄初识','进阶攻略'],
      promosActive:0,
      titles:['详情','技能','背景']
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
      // console.log(this.model)
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="less">
.page-hero{
  position: relative;
  z-index: 999;
  height: 100vh;
}
  .heronav{
    position: sticky;
    top:0;
    z-index: 999;
  }
  .skilltitle{
    color:#338c7a;
    font-weight: bold;
  }
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
    overflow: hidden;
    position: relative;
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
      top: 0px;
      bottom: 5px;
      background: rgba(0, 0, 0, 0.6); 
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