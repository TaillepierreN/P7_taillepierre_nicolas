<template>
  <div class="wrap">
    <div class="comment" id="comment">
      <div class="comment_info">
        <div class="comment_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ editComment.user.username }}</h4>
        </div>
        <p v-if="editComment.createdAt === editComment.updatedAt">
          Posté le: {{ formatDate(editComment.createdAt) }}
        </p>
        <p v-else>
          Posté le: {{ formatDate(editComment.createdAt) }} Modifié:
          {{ formatDate(editComment.updatedAt) }}
        </p>
      </div>
      <div class="comment_content">
        <button v-if="isUserOrAdmin == true" @click="editCom = !editCom">
          edit
        </button>
        <p v-if="!editCom">{{ editComment.content }}</p>
        <input v-else v-model="editComment.content" type="textarea" />
        <button v-if="editCom" @click="editCmt">Enregistrer</button>
      </div>
      <button v-if="editCom" @click="delCmt">Supprimer</button>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "CommentComponent",
  props: ["comment", "postId"],

  data() {
    return {
      isUserOrAdmin: false,
      editComment: { ...this.comment },
      editCom: false,
    };
  },

  methods: {

    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },
  
    editCmt: function (e) {
      e.preventDefault();
      fetch(
        `http://localhost:3010/post/${this.postId}/comment/${this.comment.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            content: this.editComment.content,
          }),
        }
      ).then(() => {
        this.editCom = false;
      });
    },

    delCmt: function (e) {
      e.preventDefault();
      fetch(
        `http://localhost:3010/post/${this.postId}/comment/${this.comment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then(() => (window.location.href = `/post/${this.postId}`));
    },

},


  mounted() {
    let uid = window.localStorage.getItem("userId");
    let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
    if (this.comment.user.id == uid || admin == true) {
      this.isUserOrAdmin = true;
    }
  },

};
</script>
