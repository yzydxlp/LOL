<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 3.3846rem;
  background-color: #1f271b;
}
.left,.right{
  width: 6.1538rem;
  background: #1f271b;
}
.center{
  flex: 1;
}
</style>