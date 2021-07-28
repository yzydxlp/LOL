<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:"TabBar"
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1f271b;
    box-shadow: 0px -1px 3px rgba(0, 0, 0,0.1 );
    z-index: 999;
  }
  
</style>