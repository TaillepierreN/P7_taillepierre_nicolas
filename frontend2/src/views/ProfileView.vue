<template>
  <div class="home">
    <div v-if="this.userfound == false" class="missingprofile">
      <v-card-title class="ma-auto center" justify-center>Aucun profile trouvé</v-card-title>
    </div>
    <ProfileComponent v-else :user="user" :userfound="userfound" />
  </div>
</template>
<script>
// @ is an alias to /src

import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
  name: "ProfileView",
  components: {
    ProfileComponent,
  },

  data() {
    return {
      user: [],
      post: [],
      userfound: false,
    };
  },

  mounted() {
    /** Récupere l'utilisateur par son ID */
    fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data;
        if (this.user.id) {
          this.userfound = true;
        }
      })
      .catch((err) => {
        this.userfound = false
        console.log(err.message)});
  },
};
</script>