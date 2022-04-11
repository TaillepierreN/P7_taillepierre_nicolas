<template>
  <div class="home">
    <PostComponent
      v-if="post"
      :post="post"
      :singlePost="true"
      :postlikesCount="postlikesCount"
    />
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
  }),

  mounted() {
    
    fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.post = data))
      .catch((err) => console.log(err.message));

    fetch(`http://localhost:3010/post/${this.$route.params.id}/like`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.postlikesCount = JSON.stringify(data)))
      .catch((err) => console.log(err.message));
  },
};
</script>
  