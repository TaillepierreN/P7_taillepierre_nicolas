<template>
  <img src="@\assets\img\icon-above-font.svg" alt="Banniere Groupomania" id="banner" />
  <nav>
    <router-link to="/">Acceuil</router-link> |
    <router-link to="/login" v-if="!isLogged">Login</router-link>
    <router-link
      :to="{ name: 'profile', params: { id: userId } }"
      v-if="isLogged"
      >Profile ( {{ user.username }} )</router-link
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

