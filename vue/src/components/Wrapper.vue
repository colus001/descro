<template>
 <div class="wrapper">
    <Header />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Wrapper',
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.wrapper,
.wrapper > * {
  display: flex;
}

.wrapper {
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;
}

// .main {
//   padding-left: 300px;
//   flex-grow: 3;
// }
</style>
