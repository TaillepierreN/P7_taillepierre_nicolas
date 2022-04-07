<template>
  <ProfileComponent :user="user" />
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
    };
  },
  mounted() {
    
    fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.user = data))
      .catch((err) => console.log(err.message));
  },
};
</script>