<template>
  <div class="postcom">
    <div class="post">
      <div class="post_info">
        <div class="post_info_user">
          <div class="post_info_user_img">
            <img
              :src="editPost.user.profilepic"
              alt="Image de profile"
              v-if="editPost.user.profilepic != null"
            />
            <img src="@/assets/img/icon.svg" alt="Image de profile" v-else />
          </div>
          <h4 v-if="!ownuser">
            <router-link
              :to="{ name: 'profile', params: { id: editPost.user.id } }"
            >
              {{ editPost.user.username }}
            </router-link>
          </h4>
          <h4 v-else class="ownuser">
            <router-link
              :to="{ name: 'profile', params: { id: editPost.user.id } }"
            >
              {{ editPost.user.username }}
            </router-link>
          </h4>
        </div>
        <router-link
          v-if="!editMode"
          class="post_title"
          :to="{ name: 'posts', params: { id: editPost.id } }"
        >
          {{ editPost.title }}
        </router-link>
        <input v-if="editMode" type="text" v-model="editPost.title" />
        <div class="post_info_date">
          <p>Posté le {{ formatDate(editPost.createdAt) }}</p>
          <p
            class="post_info_date_updated"
            v-if="editPost.createdAt != editPost.updatedAt"
          >
            ( Modifié: {{ formatDate(editPost.updatedAt) }} )
          </p>
        </div>
      </div>
      <div class="post_content">
        <img v-if="!editMode" id="imgpost" :src="editPost.attachment" alt="" />
        <p v-if="!editMode">{{ editPost.content }}</p>
        <textarea
          class="editPostContent"
          type="text"
          v-if="editMode"
          v-model="editPost.content"
        />
        <div class="post_content_img" v-if="editMode">
          <label for="image">image</label>
          <input
            id="image"
            @change="onFileChange"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            type="file"
          />
        </div>
      </div>
      <div class="post_likecombar">
        <div class="edit">
          <button
            class="edit_button editbuttons"
            v-if="isUserOrAdmin == true && singlePost == true"
            @click="editMode = !editMode"
          >
            <p v-if="!editMode">Edit</p>
            <p v-else>Annuler</p>
          </button>
          <button class="editbuttons" @click="editMsg" v-if="editMode">
            Sauvegarder
          </button>
          <button class="editbuttons" @click="delMsg" v-if="editMode">
            Supprimer
          </button>
        </div>
        <div class="editDivider"></div>
        <div class="post_likecombar_counter">
          <a v-if="singlePost" class="postlink" href="#newCom">
            <p class="commentsCount">
              Commentaires
              <span v-if="singlePost"> ({{ this.postCommentCount }}) </span>
            </p>
          </a>
          <a v-else class="postlink" :href="`/post/${this.editPost.id}#newCom`">
            <p class="commentsCount">
              Commentaires
            </p>
          </a>
          <button @click="likeswitch" class="likebutton">
            <img
              class="likebutton_img"
              v-if="!hasLiked"
              src="@\assets\img\icons8-like-64.png"
              alt="Bouton like"
            />
            <img
              class="likebutton_img"
              v-else
              src="@\assets\img\icons8-like-64f.png"
              alt="Bouton like"
            />
            <p v-if="!hasLiked" class="likeCount">
              <span> {{ this.postlikesCount }}</span>
            </p>
            <p v-else class="likeCount full">
              <span> {{ this.postlikesCount }}</span>
            </p>
          </button>
        </div>
      </div>
    </div>
    <div v-if="comments && singlePost == true" class="com">
      <div class="comment" id="newCom">
        <h3 class="comTitle">Commentaires</h3>
        <button class="editbuttons" @click="addComment = !addComment">
          Ajouter commentaire
        </button>
      </div>
      <div class="newcomment">
        <NewCommentComponent v-if="addComment == true" :id="this.post.id" />
      </div>
      <CommentComponent
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
        :postId="this.post.id"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
require("dayjs/locale/fr");
import CommentComponent from "@/components/CommentComponent.vue";
import NewCommentComponent from "@/components/NewCommentComponent.vue";

export default {
  name: "PostComponent",
  props: ["post", "singlePost", "isUserOrAdmin"],
  components: {
    CommentComponent,
    NewCommentComponent,
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
    this.comments = this.post.comments;
    if (this.comments) {
      this.comments = this.comments.reverse();
    }
    let uid = window.localStorage.getItem("userId");
    if (!this.singlePost) {
      this.postlikesCount = this.editPost.likesCount;
      this.postCommentCount = this.editPost.commentsCount;
    } else {
      this.postlikesCount = this.editPost.likes.length;
      this.postCommentCount = this.editPost.comments.length;
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
    dayjs.locale("fr");
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
