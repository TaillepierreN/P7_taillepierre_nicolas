<template>
  <v-app >
    <v-app-bar
      class="flex-sm-column all-nav"
      app
      color="red darken-3"
      dark
      height="80"
    >
      <div class="d-flex align-center">
        <v-btn text height="80" href="/">
          <v-img
            alt="Groupomania Logo"
            class="shrink mr-2"
            contain
            src="./assets\img\icon-left-font-monochrome-white.svg"
            width="350"
            height="80"
          />
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      
      <div class="navbar">
        <v-btn href="/login" text v-if="!isLogged">
          <span class="mr-2">Login</span>
        </v-btn>
        <NewPost v-if="isLogged"/>
        <v-btn
          :to="{ name: 'profile', params: { id: userId } }"
          text
          v-if="isLogged"
        >
          <span class="mr-2">Profile ({{ user.username }})</span>
        </v-btn>

        <v-btn class="mx-1" icon v-if="isLogged" @click="disconnect">
          <v-icon dark>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import NewPost from './components/Newpost.vue'

export default {
  components:{
    NewPost
  },

  data: () => ({
    isLogged: false,
    userId: window.localStorage.getItem("userId"),
    user: {},
  }),

  mounted() {
    const userId = window.localStorage.getItem("userId");

    /** Affiche le nom de l'utilisateur dans la barre de navigation si loggé */
    if (this.$route.name != "login") {
      if (this.$route.name != "signup") {
        fetch(`http://localhost:3010/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => (this.user = data));
      }
    }

    /** Verifie si l'utilisateur est loggé en vérifiant si un token est présent*/
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
