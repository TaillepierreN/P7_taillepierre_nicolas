<template>
  <div>
    <div class="comment" id="comment">
      <div class="comment_info">
        <div class="comment_info_user">
          <div class="comment_info_user_img">
            <img
              :src="editComment.user.profilepic"
              alt="Image de profile"
              v-if="editComment.user.profilepic != null"
            />
            <img src="@/assets/img/icon.svg" alt v-else />
          </div>
          <h4 v-if="!owncomuser">{{ editComment.user.username }}</h4>
          <h4 v-else class="ownuser">{{ editComment.user.username }}</h4>
        </div>

        <div class="comment_info_date">
          <p>Posté le: {{ formatDate(editComment.createdAt) }}</p>
          <p
            class="comment_info_date_updated"
            v-if="editComment.createdAt != editComment.updatedAt"
          >
            ( Modifié: {{ formatDate(editComment.updatedAt) }} )
          </p>
        </div>
      </div>
      <div class="comment_content">
        <p v-if="!editCom">{{ editComment.content }}</p>
        <input v-else v-model="editComment.content" type="textarea" />
      </div>
      <div class="editcomment">
        <button
          v-if="isUserOrAdmin == true"
          @click="editCom = !editCom"
          class="editbuttons"
        >
          <p v-if="!editCom">Edit</p>
          <p v-else>Annuler</p>
        </button>
        <div class="editcomment_buttons">
          <button v-if="editCom" @click="editCmt" class="editbuttons">
            Enregistrer
          </button>
          <button v-if="editCom" @click="delCmt" class="editbuttons">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
require("dayjs/locale/fr")

export default {
  name: "CommentComponent",
  props: ["comment", "postId"],

  data() {
    return {
      isUserOrAdmin: false,
      editComment: { ...this.comment },
      editCom: false,
      owncomuser: false,
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },

    editCmt: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/comment/${this.comment.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          content: this.editComment.content,
        }),
      }).then(() => {
        this.editCom = false;
      });
    },

    delCmt: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/comment/${this.comment.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => (window.location.href = `/post/${this.postId}`));
    },
  },

  mounted() {
    let uid = window.localStorage.getItem("userId");
    let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
    if (this.comment.user.id == uid || admin == true) {
      this.isUserOrAdmin = true;
    }
    if (this.comment.user.id == uid) {
      return (this.owncomuser = true);
    }
    dayjs.locale("fr")
  },
};
</script>
