<template>
  <img src="@\assets\img\icon-left-font-monochrome-white.png" alt="" />
  <nav>
    <router-link to="/">Acceuil</router-link> |
    <router-link to="/login" v-if="!isLogged">Login</router-link>
    <router-link
      :to="{ name: 'profile', params: { id: userId } }"
      v-if="isLogged"
      >Profile</router-link
    >
    |
    <button v-if="isLogged" @click="disconnect" id="dcbutton">
      <img src="@\assets\img\icons8-déconnexion-50.png" alt="" />
    </button>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    let isLogged = false;
    if (localStorage.getItem("token")) {
      isLogged = true;
    }

    const userId = window.localStorage.getItem("userId");
    return {
      isLogged,
      userId,
    };
  },
  methods: {
    disconnect: function (e) {
      e.preventDefault();
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("isAdmin");
      location.reload();
    },
  },
};
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
