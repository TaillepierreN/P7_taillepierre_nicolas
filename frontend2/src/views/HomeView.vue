<template>
  <v-container>
    <PostComponent
      :post="post"
      v-for="post in posts"
      :key="post.id"
      :singlePost="false"
    />
  </v-container>
</template>

<script>
import PostComponent from "../components/PostComponent";

export default {
  name: "HomeView",

  components: {
    PostComponent,
  },

  data: () => ({
    posts: [],
  }),
  mounted() {
    fetch("http://localhost:3010/post/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));
  },
};
</script>
