<template>
  <div class="wrap">
    <div class="post">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ post.user.username }}</h4>
          <button @click="editMode = !editMode">Edit</button>
        </div>
        <router-link
          v-if="!editMode"
          class="post_title"
          :to="{ name: 'posts', params: { id: post.id } }"
        >
          {{ post.title }}
        </router-link>
        <input v-if="editMode" type="text" v-model="editPost.title" />
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
        <p class="commentsCount">Commentaire ({{ post.commentsCount }})</p>
        <span> </span>
        <p class="likeCount">likes: ({{ post.likesCount }})</p>
      </div>
    </div>
    <div v-if="comments">
      <!-- <h1>{{ comments }}</h1> -->
      <CommentComponent
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CommentComponent from "@/components/CommentComponent.vue";

export default {
  name: "PostComponent",
  props: ["post"],
  components: {
    CommentComponent,
  },

  data() {
    return {
      editPost: { ...this.post },
      editMode: false,
      comments: [],
      isUserOrAdmin: false
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },
    
  },

  mounted(){
    this.comments = this.post.comments
    if(this.comments){
      this.comments = this.comments.reverse()
    }
      let uid = window.localStorage.getItem("userId");
      let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
      console.log(admin);
      if(this.post.user.id == uid || admin == true){
        console.log("yay")
        this.isUserOrAdmin = true
        return this.isUserOrAdmin;
      }

  },


  // filters: {
  //   reverse(comments) {
  //     return comments.sortDirection = "DESC"
  //   }
  // }

  // mounted() {
  //     let url = document.location.pathname.split('/')[2].replace(/"/g,'')
  //         fetch(`http://localhost:3010/post/${url}`)
  //         .then((res) => res.json())
  //         .then((data) => (this.post = data))
  //         .catch((err) => console.log(err.message));
  // },
};
</script>
