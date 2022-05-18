<template>
  <v-layout align-center justify-center>
    <v-card elevation="1" class="mt-10 mb-5" width="800">
      <v-row no-gutters class="post_userinfo">
        <v-avatar size="55" class="ms-5 my-2">
          <img
            :src="editPost.user.profilepic"
            alt="Image de profile"
            v-if="editPost.user.profilepic != null"
          />
        </v-avatar>
        <div>
          <router-link
            v-if="!ownuser"
            :to="{ name: 'profile', params: { id: editPost.user.id } }"
          >
            <h3 class="ml-5">
              {{ editPost.user.username }}
            </h3>
          </router-link>
          <router-link
            v-else
            :to="{ name: 'profile', params: { id: editPost.user.id } }"
          >
            <h4 class="red--text ml-5">
              {{ editPost.user.username }}
            </h4>
          </router-link>
          <div class="grey--text ms-5 text-caption">
            {{ formatDate(editPost.createdAt) }}
          </div>
          <div
            class="grey--text ms-5 text-caption"
            v-if="editPost.createdAt != editPost.updatedAt"
          >
            (modifié:{{ formatDate(editPost.updatedAt) }})
          </div>
        </div>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-container>
          <!-- <router-link
            v-if="!editMode && !singlePost"
            class="post_title"
            :to="{ name: 'posts', params: { id: editPost.id } }"
          > -->
          <h2 class="black--text">
            {{ editPost.title }}
          </h2>
          <v-card-text>
            {{ editPost.content }}
          </v-card-text>
          <v-img :src="editPost.attachment"> </v-img>
          <!-- </router-link> -->
        </v-container>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-btn plain outlined text @click="likeswitch" class="ml-1 my-1">
          <v-icon left>mdi-thumb-up</v-icon>
          <span v-if="this.postlikesCount != 0">{{ this.postlikesCount }}</span>
          <span v-else>Like</span>
        </v-btn>
        <v-btn plain outlined text class="ml-1 my-1">
          <v-icon left>mdi-comment-multiple</v-icon> comment</v-btn
        >
      </v-row>
    </v-card>
  </v-layout>
</template>

<script>
import dayjs from "dayjs";
require("dayjs/locale/fr");
// import CommentComponent from "@/components/CommentComponent.vue";
// import NewCommentComponent from "@/components/NewCommentComponent.vue";

export default {
  name: "PostComponent",
  props: ["post", "singlePost", "isUserOrAdmin"],
  components: {
    // CommentComponent,
    // NewCommentComponent,
  },

  data() {
    return {
      editPost: { ...this.post, image: null },
      editMode: false,
      comments: [],
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
      addComment: false,
      hasLiked: false,
      postlikesCount: 0,
      postCommentCount: 0,
      ownuser: false,
    };
  },
  mounted() {
    // this.comments = this.post.comments;
    dayjs.locale("fr");
    // if (this.comments) {
    //   this.comments = this.comments.reverse();
    // }
    let uid = window.localStorage.getItem("userId");
    if (!this.singlePost) {
      this.postlikesCount = this.editPost.likesCount;
      // this.postCommentCount = this.editPost.commentsCount;
    } else {
      this.postlikesCount = this.editPost.likes.length;
      // this.postCommentCount = this.editPost.comments.length;
      let liketable = this.editPost.likes;
      liketable.forEach((element) => {
        if (element.userid == uid) {
          return (this.hasLiked = true);
        }
      });
    }
    if (this.editPost.user.id == uid) {
      return (this.ownuser = true);
    }
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("D MMM 'YY à HH:mm");
    },

    editMsg: function (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", this.editPost.id);
      formData.append("title", this.editPost.title);
      formData.append("type", "post");
      formData.append("image", this.editPost.image);
      formData.append("content", this.editPost.content);
      fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        this.editMode = false;
      });
    },

    delMsg: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id: this.post.id,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }).then(() => (window.location.href = "/"));
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!this.acceptedFile.includes(file.type)) {
        e.target.value = null;
        return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
      }
      this.editPost.image = file;
    },

    likeswitch(e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.post.id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      }).then(() => {
        if (this.singlePost == true) {
          window.location.href = `/post/${this.post.id}`;
        } else {
          window.location.reload();
        }
      });
    },
  },
};
</script>