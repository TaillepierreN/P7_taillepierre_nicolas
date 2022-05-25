<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar align-center dark color="blue darken-3">
            <v-toolbar-title>Connexion</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                v-model="password"
                :rules="passwordRules"
              >
              </v-text-field>
              <v-container class="error--text">
                {{ this.errormsg }}
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-2" dark @click="loginForm"
              >Se connecter</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LogComponent",
  components: {},
  props: {
    account: Boolean,
  },

  data() {
    return {
      email: "",
      emailRules: [
        (v) => !!v || "Email requis",
        (v) => /.+@.+\..+/.test(v) || "E-mail doit etre valide",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Mot de passe requis"],
      errormsg: "",
    };
  },

  methods: {
    /** Permet de se connecter a partir des informations du formulaire */
    loginForm: function (e) {
      e.preventDefault();
      fetch("http://localhost:3010/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          /** Enregistre les informations du compte dans le local storage */
          if (json.token) {
            window.localStorage.setItem("token", json.token);
            window.localStorage.setItem("userId", json.userId);
            window.localStorage.setItem("isAdmin", json.isAdmin);
            window.localStorage.setItem("isMod", json.isMod);
            window.location.href = "/";
          } else {
            return (this.errormsg = JSON.stringify(json));
          }
        });
    },
  },
};
</script>