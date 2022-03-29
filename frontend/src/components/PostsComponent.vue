<template>
  <div class="wrap">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt="" />
          <h4>{{ post.user.username }}</h4>
        </div>
        <h3>
          <router-link class="post_title" :to="{ name: 'posts', params: { id: post.id}}"> {{ post.title }} </router-link>
        </h3>
        <p v-if="post.createdAt === post.updatedAt">
          Posté le: {{ formatDate(post.createdAt) }}
        </p>
        <p v-else>
          <!-- Posté le: {{ formatDate(post.createdAt) }}  -->
          Modifié:{{ formatDate(post.updatedAt) }}
        </p>
      </div>
      <div class="post_content">
        <p>
          {{ post.content }}
        </p>
      </div>
      <div class="post_likecombar">
        <p>Commentaire ({{ post.commentsCount }})</p>
        <span></span>
        <p>like {{ post.likesCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "PostsComponent",

  data() {
    return {
      posts: [],
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },
  },

  mounted() {
    fetch("http://localhost:3010/post/")
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

