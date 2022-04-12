<template>
  <div class="wrap">
    <div class="profile">
      <h1>Profile</h1>
      <div class="profile_div">
        <img
          :src="editUser.profilepic"
          alt="Image de profile"
          v-if="editUser.profilepic != null"
          style="height: 160px;
    width: fit-content"
        />
        <img
          :src="user.profilepic"
          alt="Image de profile"
          v-else-if="user.profilepic != null"
          style="height:160px, width: fit-content"
        />
        <img src="@/assets/img/icon.svg" alt="Image de profile" v-else />
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
      </div>
      <button
        @click="editModeFn"
        v-if="isUserOrAdmin == true && !editMode"
      >
        edit
      </button>
      <button v-else-if="editMode" @click="editMode = !editMode">
        annuler
      </button>
      <button v-if="editMode" @click="editUsr">Sauvegarder</button>
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
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "ProfileComponent",
  props: ["user"],
  components: {
    PostComponent,
  },

  data() {
    return {
      editUser: { ...this.user },
      newprofilepic: null,
      editMode: false,
      posts: [],
      isUserOrAdmin: false,
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
  },

  methods: {
    editUsr: function (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", this.editUser.username);
      formData.append("email", this.editUser.email);
      formData.append("password", this.editUser.password);
      formData.append("image", this.newprofilepic);
      fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => (this.editMode = false));
    },

    editModeFn: function(e) {
      e.preventDefault()
      this.editMode = !this.editMode
      this.editUser = this.user
    },

    onProfilChange(e) {
      const file = e.target.files[0];
      if (!this.acceptedFile.includes(file.type)) {
        e.target.value = null;
        return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
      }
      this.newprofilepic = file;
    },
  },
};
</script>
