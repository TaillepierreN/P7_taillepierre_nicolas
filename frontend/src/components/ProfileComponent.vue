<template>
  <div class="wrap">
    <div class="profile">
      <h1>Profile</h1>
      <div class="profile_div">
        <label
          >email : {{ user.email }}
          <input type="text" v-if="editMode" v-model="editUser.email"
        /></label>
        <label
          >username :{{ user.username }}
          <input type="text" v-if="editMode" v-model="editUser.username"
        /></label>
      </div>
      <button @click="editMode = !editMode">edit</button>
      <div class="profile_post">
        <h1>Post de l'utilisateur</h1>
        <div class="profile_post_list">
          <PostComponent
            :post="post"
            v-for="post in posts"
            :key="post.id"
            :singlePost="false"
          />
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
      editUser: { ...this.user },
      editMode: false,
      posts: [],
    };
  },

  mounted() {
    fetch(`http://localhost:3010/post?userId=${this.$route.params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));
  },

  methods: {

    editUsr: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/`);
    },
    
  },
};
</script>
