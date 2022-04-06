<template>
  <div class="home">
    <PostComponent v-if="post" :post="post" :singlePost="true" />
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
  }),

  mounted() {
    let url = document.location.pathname.split("/")[2].replace(/"/g, "");
    fetch(`http://localhost:3010/post/${url}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.post = data))
      .catch((err) => console.log(err.message));
  },
};
</script>
  