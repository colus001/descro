<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Content />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Content from '@/components/Content.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    Content
  }
}
</script>
