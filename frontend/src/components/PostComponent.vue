<template>
  <div>
    <div class="post" id="post">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ post.user.username }}</h4>
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
        <p v-if="!editMode">{{ post.content }}</p>
        <textarea
          class="editPostContent"
          type="text"
          v-if="editMode"
          v-model="editPost.content"
        />
      </div>
      <div class="post_likecombar">
        <div class="edit">
          <button
            class="edit_button"
            v-if="isUserOrAdmin == true && singlePost == true"
            @click="editMode = !editMode"
          >
            <p v-if="!editMode">Edit</p>
            <p v-else>Annuler</p>
          </button>
          <button @click="editMsg" v-if="editMode">Sauvegarder</button>
          <button @click="delMsg" v-if="editMode">Supprimer</button>
        </div>
        <div class="editDivider"></div>
        <div class="post_likecombar_counter">
          <p class="commentsCount">
            Commentaire ( <span v-if="!post.commentsCount">0</span
            ><span v-else>
              {{ post.commentsCount }}
            </span>
            )
          </p>
          <p class="likeCount">
            likes: ( <span v-if="!post.commentsCount">0</span>
            <span v-else>
              {{ post.likesCount }}
            </span>
            )
          </p>
        </div>
      </div>
    </div>
    <div v-if="comments">
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
      isUserOrAdmin: false,
      singlePost: false,
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },

    editMsg: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: this.post.id,
          ...this.editPost,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((this.editMode = false))
        .then((window.location.href = `/post/${this.post.id}`));
    },

    delMsg: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.post.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id: this.post.id,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((window.location.href = "/"));
    },
  },

  mounted() {
    this.comments = this.post.comments;
    if (this.comments) {
      this.comments = this.comments.reverse();
    }
    let uid = window.localStorage.getItem("userId");
    let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
    if (this.post.user.id == uid || admin == true) {
      this.isUserOrAdmin = true;
      if (window.location.href.indexOf("post") > 0) {
        this.singlePost = true;
      }
    }
  },
};
</script>
