<template>
  <div class="wrap">
    <div class="profile">
      <h1>Profile</h1>
      <div class="profile_div">
        <img
          class="profilepageimg"
          :src="user.profilepic"
          alt="Image de profile"
          style="height:160px, width: fit-content"
          v-if="user.profilepic != null"
        />
        <img
          class="profilepageimg"
          src="@/assets/img/icon.svg"
          alt="Image de profile"
          v-else
        />
        <button v-if="editMode" class="editbuttons" @click="confirmdel">
          Supprimer le compte
        </button>
        <div class="deluser" id="deluser">
          <h3>Voulez vous vraiment supprimer ce compte utilisateur?</h3>
          <button class="editbuttons" @click="delUsr">Oui</button
          ><button class="editbuttons" @click="confirmdel">non</button>
        </div>
        <label for="image" v-if="editMode">image de profil:</label>
        <input
          id="image"
          @change="onProfilChange"
          accept=".jpg, .jpeg, .png, .gif, .webp"
          type="file"
          v-if="editMode"
        />
        <label
          >email : {{ user.email }}
          <input type="text" v-if="editMode" v-model="editUser.email"
        /></label>
        <label
          >username :{{ user.username }}
          <input type="text" v-if="editMode" v-model="editUser.username"
        /></label>
        <div class="modcheck" v-if="isAdmin && editMode">
          <input type="checkbox" id="modcheck" v-model="this.editUser.isMod" />
          <label for="modcheck">Modérateur</label>
        </div>
        <button
          class="editbuttons"
          @click="editPass = !editPass"
          v-if="editMode"
        >
          Changer de mot de passe
        </button>
        <label v-if="editPass"
          >Mot de passe:<input type="password" v-model="newpassword"
        /></label>
      </div>
      <div class="profile_button">
        <button v-if="editMode" @click="editUsr" class="editbuttons">
          Sauvegarder
        </button>
        <button
          @click="editModeFn"
          class="editbuttons"
          v-if="isUserOrAdmin == true && !editMode"
        >
          edit
        </button>
        <button
          v-else-if="editMode"
          class="editbuttons"
          @click="editMode = !editMode"
        >
          annuler
        </button>
      </div>
    </div>
    <div class="profile_post">
      <h1>Post de l'utilisateur</h1>
      <div class="profile_post_list">
        <PostComponent
          :post="post"
          v-for="post in posts"
          :key="post.id"
          :singlePost="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "ProfileComponent",
  props: ["user", "userfound"],
  components: {
    PostComponent,
  },

  data() {
    return {
      editUser: { ...this.user },
      newpassword: "",
      newprofilepic: null,
      editMode: false,
      editPass: false,
      posts: [],
      isUserOrAdmin: false,
      isAdmin: false,
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
    };
  },

  mounted() {
    fetch(`http://localhost:3010/post?userId=${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));
    let uid = window.localStorage.getItem("userId");
    let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
    if (this.$route.params.id == uid || admin == true) {
      this.isUserOrAdmin = true;
    }
    if (admin == true) {
      this.isAdmin = true;
    }
  },

  methods: {
    editUsr: function (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", this.editUser.username);
      formData.append("email", this.editUser.email);
      if (this.newpassword.length > 0) {
        formData.append("password", this.newpassword);
      }
      formData.append("image", this.newprofilepic);
      formData.append("isMod", this.editUser.isMod)
      fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        this.editMode = false;
        this.editPass = false;
      });
    },

    confirmdel: function (e) {
      e.preventDefault();
      let delbloc = document.getElementById("deluser");
      if (delbloc.style.display === "block") {
        delbloc.style.display = "none";
      } else {
        delbloc.style.display = "block";
      }
    },

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

    editModeFn: function (e) {
      e.preventDefault();
      this.editMode = !this.editMode;
      this.editUser = this.user;
    },

    onProfilChange(e) {
      const file = e.target.files[0];
      if (!this.acceptedFile.includes(file.type)) {
        e.target.value = null;
        return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
      }
      document.getElementsByClassName("profilepageimg")[0].src =
        URL.createObjectURL(file);
      document.getElementsByClassName("profilepageimg")[0].src =
        URL.createObjectURL(file);
      this.newprofilepic = file;
    },
  },
};
</script>
