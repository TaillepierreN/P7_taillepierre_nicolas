<template>
    <img src="@\assets\img\icon-above-font.svg" alt="">
  <nav>
    <router-link to="/">Acceuil</router-link> |
    <router-link to="/login" v-if="!isLogged">Login</router-link>
    <router-link to="/profile" v-else>Profile</router-link>
  </nav>
  <router-view/>
</template>

<script>
  export default{
    data() {
      return {
        isLogged: true
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
