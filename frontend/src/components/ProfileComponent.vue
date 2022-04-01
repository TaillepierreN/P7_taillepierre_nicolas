<template>
  <div class="wrap">
    <div class="profile">
      <h1>Profile</h1>
      <div class="profile_div">
        <label>email : {{ user.email }}</label>
        <label>username :{{ user.username }}</label>
      </div>
      <div class="profile_post">
        <h1>Post de l'utilisateur</h1>
        <div class="profile_post_list" >
          <PostComponent :post="post" v-for="post in filteredPosts" :key="post.id"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "ProfileComponent",
  components: {
    PostComponent,
  },
  props: ["user"],
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    fetch(`http://localhost:3010/post`)
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));
  },

  computed:{
      filteredPosts: function () {
          return this.posts.filter(postf => postf.user.id === JSON.parse(document.location.pathname.split('/')[2].replace(/"/g,'')))
      }
  }
  
};
</script>
// v-if="user.id === post.user.id"