<template>
  <v-container>
    <v-container v-if="editMode">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar align-center dark color="green lighten-1">
              <v-toolbar-title>Editer le profile</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-checkbox label="Modérateur" v-model="isMod"></v-checkbox>
                </v-container>
                <v-text-field
                  id="profileuser"
                  name="username"
                  label="Nom d'utilisateur"
                  type="text"
                  v-model="editUser.username"
                  :rules="fieldRules"
                ></v-text-field>
                <v-text-field
                  id="profilmail"
                  name="Email"
                  label="Email"
                  type="email"
                  v-model="editUser.email"
                  :rules="emailRules"
                ></v-text-field>
                <v-checkbox label="Changer le mot de passe?" v-model="editPass">
                </v-checkbox>
                <v-container v-if="editPass">
                  <v-text-field
                    id="editpass"
                    name="password"
                    label="Nouveau mot de passe"
                    type="password"
                    v-model="newpassword"
                    :rules="fieldRules"
                  ></v-text-field>
                  <v-text-field
                    id="editpassconf"
                    name="password"
                    label="Confirmer le mot de passe"
                    type="password"
                    v-model="confirmnewpassword"
                    :rules="passRules"
                  ></v-text-field>
                </v-container>
                <v-file-input
                  id="image"
                  accept="image/png, image/jpeg, image/gif , image/webp, image/jpeg"
                  placeholder="Choisir une image de profile(optionel)"
                  prepend-icon="mdi-camera"
                  label="Image de profil"
                  v-model="newprofilepic"
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
              <v-card-actions class="edit_profil_action">
                <pop-up />
                <v-spacer></v-spacer>
                <v-btn color="grey lighten-1" dark @click="editModeFn"
                  >Annuler</v-btn
                >
                <v-btn color="green lighten-1" dark @click="editUsr"
                  >Enregistrer</v-btn
                >
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card class="mx-auto my-12" tile max-width="600px" v-if="!editMode">
      <v-img height="200" src="../assets/img/icon.svg"></v-img>
      <v-col>
        <v-avatar size="100" class="profile_avatar">
          <v-img v-if="user.profilepîc !== null" :src="user.profilepic"></v-img>
          <v-img v-else src="../assets/img/icon.svg"></v-img>
        </v-avatar>
      </v-col>
      <v-list-item color="rgba(0, 0, 0, .4)">
        <v-list-item-content>
          <v-list-item-title class="title">{{
            user.username
          }}</v-list-item-title>
          <v-list-item-subtitle
            ><a :href="`mailto:${user.email}`">{{
              user.email
            }}</a></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-layout>
        <v-list-item>
          <v-list-item-subtitle
            >A rejoint le {{ formatDate(user.createdAt) }}</v-list-item-subtitle
          >
        </v-list-item>
        <v-spacer></v-spacer>
        <v-btn class="mr-3" v-if="isUserOrAdmin" @click="editMode = !editMode"
          >Editer le profil</v-btn
        >
      </v-layout>
    </v-card>
    <v-layout class="mx-auto column" justify-center align-center tile max-width="600px">
      <v-card-title>Liste des posts de l'utilisateur</v-card-title>
      <v-spacer></v-spacer>
      <PostComponent
        :post="post"
        v-for="post in posts"
        :key="post.id"
        :singlePost="false"
      />
    </v-layout>
  </v-container>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";
import dayjs from "dayjs";
import PopUp from "./Popup.vue";
require("dayjs/locale/fr");

export default {
  name: "ProfileComponent",
  props: ["user", "userfound"],
  components: {
    PostComponent,
    PopUp,
  },

  data() {
    return {
      editUser: { ...this.user },
      newpassword: "",
      confirmnewpassword: "",
      newprofilepic: null,
      editMode: false,
      editPass: false,
      posts: [],
      isUserOrAdmin: false,
      isAdmin: false,
      isMod: this.user.isMod,
      emailRules: [
        (v) => !!v || "Email requis",
        (v) => /.+@.+\..+/.test(v) || "E-mail doit etre valide",
      ],
      fieldRules: [(v) => !!v || "Champ requis"],
      picRules: [
        (v) =>
          this.acceptedFile.includes(v.type) ||
          "Le fichier doit etre une image au format png/jpg/jpeg/webp/gif",
      ],
      passRules: [
        (v) => !!v || "Champ requis",
        (v) => v === this.newpassword || "Le mot de passe ne correspond pas",
      ],
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
      urlpic: "",
    };
  },

  mounted() {

    /** Récupère les posts dont l'utilisateur est le créateur*/
    fetch(`http://localhost:3010/post?userId=${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));

    /** Vérifie si l'utilsateur est le propriétaire ou Admin */
    let uid = window.localStorage.getItem("userId");
    let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
    if (this.$route.params.id == uid || admin == true) {
      this.isUserOrAdmin = true;
    }
    if (admin == true) {
      this.isAdmin = true;
    }

    dayjs.locale("fr");
    this.urlpic = this.editUser.profilepic;
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("D MMM 'YY");
    },

    /** Permet d'éditer le profil a partir du formulaire */
    editUsr: function (e) {
      e.preventDefault();
      let isValid = this.$refs.form.validate();
      if (isValid == true) {
        const formData = new FormData();
        formData.append("username", this.editUser.username);
        formData.append("email", this.editUser.email);
        if (this.newpassword.length > 0) {
          formData.append("password", this.newpassword);
        }
        formData.append("image", this.newprofilepic);
        formData.append("isMod", this.isMod);
        fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then(() => {
          this.editMode = false;
          this.editPass = false;
          window.location.reload();
        });
      }
    },

    /** Affiche la confirmation de la suppression du compte */
    confirmdel: function (e) {
      e.preventDefault();
      let delbloc = document.getElementById("deluser");
      if (delbloc.style.display === "block") {
        delbloc.style.display = "none";
      } else {
        delbloc.style.display = "block";
      }
    },

    /** Supprime le compte */
    delUsr: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }).then(() => (window.location.href = "/"));
    },

    /** Annule les modification du profil*/
    editModeFn: function (e) {
      e.preventDefault();
      this.editMode = !this.editMode;
      this.editPass = false;
      this.editUser = this.user;
      this.urlpic = this.user.profilepic;
    },

    /** Lorsqu'une image est uploadé,verifie le format et met à jour l'aperçu */
    onProfilChange() {
      if (this.newprofilepic) {
        const file = this.newprofilepic;
        if (!this.acceptedFile.includes(file.type)) {
          this.urlpic = this.user.profilepic;
          return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
        }
        this.urlpic = URL.createObjectURL(file);
        this.newprofilepic = file;
      } else {
        this.urlpic = this.user.profilepic;
      }
    },
  },
};
</script>
