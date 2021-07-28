<template>
  <div class="wrap">
    <div class="content d-flex">
      <div class="left">
        <van-sidebar v-model="activeKey" class="sidenav">
          <van-sidebar-item :title="`${item.name}`" v-for="item in items" :key="item._id">
          </van-sidebar-item>
        </van-sidebar>
      </div>
      <div class="right flex-1">
        <div class="d-flex flex-wrap itemwrap jc-center" >
          <item-card v-for="item in items[activeKey].itemList" :key="item._d" 
                  :icon="item.icon"
                  :name="item.name"
                  class="itemcard p-2 m-2"></item-card> 
        </div>
        <div class="pb-5"></div>
      </div>
    </div>
    
    
      
  </div>
</template>
<script>
import ItemCard from './ItemCard.vue'
export default {
  components:{
    ItemCard
  },
  data() {
    return {
      activeKey: 0,
      items:[{
        itemList:[]
      }],
      categories:[]
    }
  },
  methods: {
    async fetchItemsCats(){
      const res = await this.$http.get('items/list')
      this.items = res.data
      console.log(this.items)
    },
    
  },
  created() {
    this.fetchItemsCats()
  },
}
</script>
<style scoped>
.left {
  /* width: 30%; */
  background-color: #f9f9f9;
  border-right: 4px solid #ee964b;
  /* border-bottom: 4px solid #ee964b; */
}

  .sidenav{
    position: sticky;
    top: 0;
    left: 0;
  }
  
</style>