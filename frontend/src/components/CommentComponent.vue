<template>
  <div class="wrap">
    <div class="comment">
      <div class="comment_info">
        <div class="comment_info_user">
          <img src="@/assets/img/icon.svg" alt />
          <h4>{{ comment.user.username }}</h4>
        </div>
        <p v-if="comment.createdAt === comment.updatedAt">
          Posté le: {{ formatDate(comment.createdAt) }}
        </p>
        <p v-else>
          Posté le: {{ formatDate(comment.createdAt) }} Modifié:
          {{ formatDate(comment.updatedAt) }}
        </p>
      </div>
      <div class="comment_content">
          <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "CommentComponent",
  props: ["comment"],

  data() {
    return {
      //   editComment: { ...this.comments },
      //   editMode: false,
    };
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("HH:mm - D MMM 'YY");
    },
  },
};
</script>
