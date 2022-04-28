<template>
  <div class="home">
    <PostComponent
      v-if="post"
      :post="post"
      :singlePost="true"
      :isUserOrAdmin="isUserOrAdmin"
    />
    <h3 v-if="!post">Aucun post trouvé</h3>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "PostView",
  components: {
    PostComponent,
  },
  data: () => ({
    post: null,
    postlikesCount: "0",
    postCommentCount: "0",
    isUserOrAdmin: false,
  }),

  mounted() {
    fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.post = data))
      .then(() => {
        let uid = window.localStorage.getItem("userId");
        let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
        if (this.post.user.id == uid || admin == true) {
          this.isUserOrAdmin = true;
        }
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
  