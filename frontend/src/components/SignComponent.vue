<template>
  <div class="signup wrap">
    <h1>Création de compte</h1>
    <form id="signform" @submit="signForm" method="post" class="signup_div">
      <label class="email"
        >email:
        <input
          id="signmail"
          v-model="sign.email"
          type="email"
          v-if="account === true"
        />
      </label>
      <label class="password"
        >password:
        <input
          id="signpass"
          v-model="sign.password"
          type="password"
          v-if="account === true"
        />
      </label>
      <label class="username"
        >username:
        <input
          id="signuser"
          v-model="sign.username"
          type="text"
          v-if="account === true"
        />
      </label>
      <label for="image">image de profil:</label>
      <input
        id="image"
        @change="onProfilChange"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        type="file"
      />
      <button>S'enregistrer</button>
    </form>
  </div>
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
      sign: {
        email: "",
        password: "",
        username: "",
        profilepic: null,
      },
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
    };
  },

  methods: {
    signForm: function (e) {
      e.preventDefault();
      const formData = new FormData();
      console.log(this.sign.profilepic);
      formData.append("email", this.sign.email);
      formData.append("password", this.sign.password);
      formData.append("username", this.sign.username);
      formData.append("image", this.sign.profilepic);
      console.log(formData);
      fetch("http://localhost:3010/auth/signup", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((window.location.href = "/login"));
    },

    onProfilChange(e) {
      const file = e.target.files[0];
      if (!this.acceptedFile.includes(file.type)) {
        e.target.value = null;
        return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
      }
      this.sign.profilepic = file;
    },
  },
};
</script>