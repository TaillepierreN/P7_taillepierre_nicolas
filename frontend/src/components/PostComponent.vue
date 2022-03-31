<template>
  <div class="wrap">
    <div class="post">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ post.user.username }}</h4><button @click="editMode=!editMode">Edit</button>
        </div>
        <router-link v-if="!editMode" class="post_title" :to="{ name: 'posts', params: { id: post.id}}"> {{ post.title }} </router-link>
        <input v-if="editMode" type="text" v-model="editPost.title">
        <p v-if="post.createdAt === post.updatedAt">
          Posté le: {{ formatDate(post.createdAt) }}
        </p>
        <p v-else>
          Posté le: {{ formatDate(post.createdAt) }} Modifié:
          {{ formatDate(post.updatedAt) }}
        </p>
      </div>
      <div class="post_content">
        <p>{{ post.content }}</p>
      </div>
      <div class="post_likecombar">
        <p>Commentaire ({{ post.comments }})</p>
        <span></span>
        <p>like</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PostComponent",
  props: ["post"],

  data() {
    return {
      editPost: {...this.post},
      editMode: false
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },
  },

  // mounted() {
  //     let url = document.location.pathname.split('/')[2].replace(/"/g,'')
  //         fetch(`http://localhost:3010/post/${url}`)
  //         .then((res) => res.json())
  //         .then((data) => (this.post = data))
  //         .catch((err) => console.log(err.message));
  // },
};
</script>
