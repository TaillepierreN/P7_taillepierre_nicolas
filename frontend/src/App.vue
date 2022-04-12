<template>
  <div
    style="display: flex;
    align-items: center"
  >
    <div>
    <img :src="user.profilepic" style="width:40px, height:auto" alt="">
    <h3 style="color: white">{{ user.username }}</h3>
    </div>
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
  </div>
  <router-view />
</template>

<script>
export default {
  data: () => ({
    isLogged: false,
    userId: window.localStorage.getItem("userId"),
    user: {},
  }),

  mounted() {
    const userId = window.localStorage.getItem("userId");
    fetch(`http://localhost:3010/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.user = data));
    console.log(this.user);

    if (localStorage.getItem("token")) {
      this.isLogged = true;
    }
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
