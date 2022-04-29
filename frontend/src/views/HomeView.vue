<template>
  <div class="home">
    <div class="wrap">
      <button id="newpostbutton">
        <router-link to="/post/">
          <img
            src="@/assets/img/icons8-plus-24.png"
            alt="Ajouter un nouveau post"
          />
          <h3>Créer un nouveau post</h3>
        </router-link>
      </button>
      <PostComponent
        :post="post"
        v-for="post in posts"
        :key="post.id"
        :singlePost="false"
      />
    </div>
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
