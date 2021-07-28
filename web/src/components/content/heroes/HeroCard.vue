<template>
  <div class="herocard">
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroes">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
              tag="div"
              :to="`/heroes/${hero._id}`"
              class="p-2 fs-lg text-center" 
              v-for="hero in category.heroList" :key="hero._id"
              style="width:20%">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.title}}</div>
          </router-link>
        </div>
      </template> 
    </m-list-card>
  </div>
</template>

<script>
export default {
  props:{
    heroes:{
      type:Array,
      default(){
        return []
      }
    },
  }
}
</script>

<style>

</style>