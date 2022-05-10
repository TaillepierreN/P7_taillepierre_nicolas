<template>
  <form @submit="newcomment" class="newcomment_content">
    <label for="newcomment_content">
      <h3>Nouveau commentaire</h3>
      <textarea id="newcomment_content" v-model="this.comment.content" placeholder="Ecrire un commentaire..." />
    </label>
    <div class="newcomment_button">
      <button class="editbuttons">Envoyer</button>
      <button type="button" class="editbuttons" @click="cancel">Annuler</button>
    </div>
  </form>
</template>
<script>
export default {
  name: "NewCommentComponent",
  props: ["id"],

  data() {
    return {
      comment: {
        content: "",
      },
    };
  },

  methods: {
    newcomment: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/comment/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postId: this.$route.params.id,
          content: this.comment.content,
          userId: localStorage.getItem("userId"),
        }),
      }).then(() => (window.location.href = `/post/${this.$route.params.id}`));
    },

    cancel: function (e) {
      e.preventDefault();
      window.location.href = `/post/${this.$route.params.id}`;
    },
  },
};
</script>
