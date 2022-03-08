<template>
  <div class="home">
    <NavVue/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavVue from '../components/NavVue.vue'

export default {
  name: 'HomeView', 
  components: {
    HelloWorld,
    NavVue
  }
}
</script>
