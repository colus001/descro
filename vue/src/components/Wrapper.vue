<template>
 <div class="wrapper">
    <SideBar />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Wrapper',
  components: {
    SideBar
  }
}
</script>

<style scoped lang="scss">
.wrapper,
.wrapper > * {
  display: flex;
}

.wrapper {
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 100vh;
}

.main {
  padding-left: 300px;
  flex-grow: 3;
}
</style>
