<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar align-center dark color="green darken-3">
            <v-toolbar-title>Créer un compte</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                id="signmail"
                name="Email"
                label="Email"
                type="email"
                v-model="sign.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="signpass"
                name="password"
                label="Mot de passe"
                type="password"
                v-model="sign.password"
                :rules="fieldRules"
              ></v-text-field>
              <v-text-field
                id="signuser"
                name="username"
                label="Nom d'utilisateur"
                type="text"
                v-model="sign.username"
                :rules="fieldRules"
              ></v-text-field>
              <v-file-input
                id="image"
                accept="image/png, image/jpeg, image/gif , image/webp, image/jpeg"
                placeholder="Choisir une image de profile(optionel)"
                prepend-icon="mdi-camera"
                label="Image de profile(optionel)"
                v-model="sign.profilepic"
                @change="onProfilChange"
              ></v-file-input>
              <v-container>
                <v-layout>
                  <v-card-text id="previewsign" v-if="urlpic"
                    >Aperçu:</v-card-text
                  >
                  <v-avatar size="72">
                    <v-img :src="urlpic" alt=""></v-img>
                  </v-avatar>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-3" dark @click="signForm"
              >Créer le compte</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
  
  <script>
export default {
  name: "SignComponent",
  components: {},
  props: {
    account: Boolean,
  },

  data() {
    return {
      emailRules: [
        (v) => !!v || "Email requis",
        (v) => /.+@.+\..+/.test(v) || "E-mail doit etre valide",
      ],
      fieldRules: [(v) => !!v || "Champ requis"],
      sign: {
        email: "",
        password: "",
        username: "",
        profilepic: null,
      },
      acceptedFile: [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
      urlpic: "",
    };
  },

  methods: {
    /** Crée un nouveau compte a partir du formulaire */
    signForm: function (e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("email", this.sign.email);
        formData.append("password", this.sign.password);
        formData.append("username", this.sign.username);
        formData.append("image", this.sign.profilepic);
        fetch("http://localhost:3010/auth/signup", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((window.location.href = "/login"));
      }
    },

    /** Lorsqu'une image est uploadé,verifie le format et met à jour l'aperçu */
    onProfilChange() {
      if (this.sign.profilepic) {
        const file = this.sign.profilepic;
        if (!this.acceptedFile.includes(file.type)) {
          this.sign.profilepic = null;
          return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
        }
        this.urlpic = URL.createObjectURL(file);
      } else {
        this.sign.profilepic = null;
        this.urlpic = "";
      }
    },
  },
};
</script>