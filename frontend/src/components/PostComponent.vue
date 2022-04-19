<template>
  <div>
    <div class="post" id="post">
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
        <div class="post_info_date">
          <p>Posté le: {{ formatDate(editPost.createdAt) }}</p>
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
          <button class="editbuttons" @click="editMsg" v-if="editMode">Sauvegarder</button>
          <button class="editbuttons" @click="delMsg" v-if="editMode">Supprimer</button>
        </div>
        <div class="editDivider"></div>
        <div class="post_likecombar_counter">
          <a class="postlink" href="#comment">
            <p class="commentsCount">
              Commentaire (
              <span v-if="singlePost == false">
                {{ editPost.commentsCount }}
              </span>
              <span v-else> {{ editPost.comments.length }}</span>
              )
            </p>
          </a>
          <button @click="likeswitch" class="likebutton">
            <img class="likebutton_img" src="@\assets\img\icons8-like-32.png" alt="Bouton like">
            <p class="likeCount">
              
              <span v-if="singlePost == false">{{ editPost.likesCount }}</span>
              <span v-else-if="this.postlikesCount">
                {{ this.postlikesCount }}</span
              >
              <span v-else>0</span>
              
            </p>
          </button>
        </div>
      </div>
    </div>
    <div v-if="comments && singlePost == true">
      <button class="editbuttons" @click="addComment = !addComment">Ajouter commentaire</button>
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
import CommentComponent from "@/components/CommentComponent.vue";
import NewCommentComponent from "@/components/NewCommentComponent.vue";

export default {
  name: "PostComponent",
  props: ["post", "singlePost", "postlikesCount", "isUserOrAdmin"],
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
    };
  },
  mounted() {
    this.comments = this.post.comments;
    if (this.comments) {
      this.comments = this.comments.reverse();
    }
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },

    editMsg: function (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", this.editPost.id);
      formData.append("title", this.editPost.title);
      formData.append("type", "post");
      formData.append("image", this.editPost.image);
      formData.append("content", this.editPost.content)
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
