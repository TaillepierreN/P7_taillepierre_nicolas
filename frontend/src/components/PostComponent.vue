<template>
  <div>
    <div class="post" id="post">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ editPost.user.username }}</h4>
        </div>
        <router-link
          v-if="!editMode"
          class="post_title"
          :to="{ name: 'posts', params: { id: editPost.id } }"
        >
          {{ editPost.title }}
        </router-link>
        <input v-if="editMode" type="text" v-model="editPost.title" />
        <p v-if="editPost.createdAt === editPost.updatedAt">
          Posté le: {{ formatDate(editPost.createdAt) }}
        </p>
        <p v-else>
          Posté le: {{ formatDate(editPost.createdAt) }} Modifié:
          {{ formatDate(editPost.updatedAt) }}
        </p>
      </div>
      <div class="post_content">
        <p v-if="!editMode">{{ editPost.content }}</p>
        <img v-if="!editMode" :src="editPost.attachment" alt="">
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
          <a class="postlink" href="#comment">
            <p class="commentsCount">
              Commentaire ( <span v-if="singlePost == false">
                {{ editPost.commentsCount }}
              </span>
              <span v-else> {{ editPost.comments.length }}</span>
              )
            </p>
          </a>

          <p class="likeCount">
            likes: ( <span v-if="!editPost.commentsCount">0</span>
            <span v-else>
              {{ editPost.likesCount }}
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
  props: ["post","singlePost"],
  components: {
    CommentComponent,
  },

  data() {
    return {
      editPost: { ...this.post },
      editMode: false,
      comments: [],
      isUserOrAdmin: false,

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
        .then(() =>this.editMode = false);
    },

    delMsg: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.post.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id: this.post.id,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
      // if (window.location.href.indexOf("post") > 0) {
      //   this.singlePost = true;
      // }
    }
  },
};
</script>
