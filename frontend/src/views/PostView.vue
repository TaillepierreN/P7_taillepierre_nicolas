<template>
  <div class="home">
    <PostComponent v-if="post" :post="post" />
  </div>
</template>
  
  <script>
// @ is an alias to /src
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "HomeView",
  components: {
    PostComponent,
  },
  data: () => ({
    post: null,
  }),

  mounted() {
    let url = document.location.pathname.split("/")[2].replace(/"/g, "");
    fetch(`http://localhost:3010/post/${url}`)
      .then((res) => res.json())
      .then((data) => (this.post = data))
      .catch((err) => console.log(err.message));
  },
};
</script>
  