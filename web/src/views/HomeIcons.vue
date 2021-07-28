<template>
  <div class="nav-icons bg-lol-white mt-3 text-center pt-3 text-lol-dark-gray">
      <div class="nav-icons-item d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-kf"></i>
          <div class="py-2">在线客服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-fhcx"></i>
          <div class="py-2">秩序殿堂</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-yxzl"></i>
          <div class="py-2">游戏资料</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-xgzd"></i>
          <div class="py-2">峡谷之巅</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-tft"></i>
          <div class="py-2">云顶之弈</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-101"></i>
          <div class="py-2">攻略中心</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-yz"></i>
          <div class="py-2">LOL宇宙</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-vxbd"></i>
          <div class="py-2">微信绑定</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-xsbb"></i>
          <div class="py-2">新手必备</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-lqzx"></i>
          <div class="py-2">领取中心</div>
        </div>
      </div>
      <div class="bg-lol-light py-2 fs-sm d-flex ai-center jc-center" @click="slideShow">
        <i class="iconfont icon-xiala mr-2 slideicon"></i>
        <span class="slidespan">收起</span>
      </div>
  </div>
</template>

<script>
 import '../assets/css/style.css'
export default {
  methods: {
    slideShow(){
        var icons = document.querySelector('.nav-icons-item');
        var spans = document.querySelector('.slidespan')
        var slideicon = document.querySelector('.slideicon')
        if(icons.offsetHeight>0){
          spans.innerHTML="展开"
          icons.style.height = 0 +"px"
          slideicon.className = "iconfont icon-xiala2-copy-copy mr-2 slideicon"
        }else {
          spans.innerHTML="收起"
          icons.style.height = 193 +"px"
          slideicon.className = "iconfont icon-xiala mr-2 slideicon"
        }
      },
  },
  mounted() {
    this.slideShow()
    this.slideShow()
  },
}
</script>
 
<style lang="less">
  .nav-icons{
    border-top: 1px solid #d4d9de;
    border-bottom: 1px solid #d4d9de;
    .nav-icons-item{
      overflow: hidden;
      transition: .5s;
      .nav-item {
        width:25%;
        border-right: 1px solid #d4d9de;
        &:nth-child(4n) {
          border-right: none;
        }
      }
    }
  }
</style>