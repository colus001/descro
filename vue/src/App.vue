<template>
  <div id="app">
    <Wrapper></Wrapper>
  </div>
</template>

<script>
import Wrapper from '@/components/Wrapper.vue'

export default {
  name: 'App',
  components: {
    Wrapper
  }
}
</script>

<style lang="scss">
@import url(./assets/style/normalize.css);

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
