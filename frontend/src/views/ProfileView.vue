<template>
  <ProfileComponent :user="user"/>

</template>
<script>
// @ is an alias to /src

import ProfileComponent from "@/components/ProfileComponent.vue"

export default {
  name: "ProfileView",
  components: {
    ProfileComponent
  },
  data() {
    return {
      user: [],
      post: []

    };
  },
  mounted() {
    let url = document.location.pathname.split("/")[2].replace(/"/g, "");
    fetch(`http://localhost:3010/user/${url}`)
      .then((res) => res.json())
      .then((data) => (this.user = data))
      .catch((err) => console.log(err.message));

    // fetch(`http://localhost:3010/post`)
    //   .then((res) => res.json())
    //   .then((data) => (this.post = data))
    //   .catch((err) => console.log(err.message));
  },
};
</script>