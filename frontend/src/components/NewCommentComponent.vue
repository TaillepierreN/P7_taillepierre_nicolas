<template>
  <form
    @submit="newcomment"
    style="background-color: white"
    class="newpost_content"
  >
    <h3>Nouveau commentaire</h3>
    <label for="newpost_content"
      ><input
        id="newpost_content"
        v-model="this.comment.content"
        type="textarea"
    /></label>
    <div class="newpost_button">
      <button>envoyer</button>
      <button type="button" @click="cancel">annuler</button>
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
      fetch(`http://localhost:3010/post/${this.$route.params.id}/comment`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content: this.comment.content,
          userId: localStorage.getItem("userId"),
        }),
      })
      .then(() => (window.location.href = `/post/${this.$route.params.id}`));

    },

    cancel: function (e) {
      e.preventDefault();
      window.location.href = `/post/${this.$route.params.id}`;
    },

  },
};
</script>
