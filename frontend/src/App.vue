<template>
  <header id="banner">
    <router-link to="/">
      <img
        src="@\assets\img\icon-left-font-monochrome-black.svg"
        alt="Banniere Groupomania"
        id="bannerimg"
      />
    </router-link>
    <nav>
      <button id="newpostbutton">
        <router-link to="/post/">
          <img
            src="@/assets/img/icons8-plus-24.png"
            alt="Ajouter un nouveau post"
          />
          <h3 class="newpostbutton_full">Créer un nouveau post</h3>
          <h3 class="newpostbutton_cropped">Poster</h3>
        </router-link>
      </button>
      <router-link to="/login" v-if="!isLogged">Login</router-link>
      <router-link
        :to="{ name: 'profile', params: { id: userId } }"
        v-if="isLogged" class="linkprofile"
        >Profile ({{ user.username }})</router-link
      >
      |
      <button v-if="isLogged" @click="disconnect" id="dcbutton">
        <img src="@\assets\img\icons8-déconnexion-50.png" alt="" />
      </button>
    </nav>
  </header>
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
      window.localStorage.removeItem("isMod");
      location.reload();
    },
  },
};
</script>

