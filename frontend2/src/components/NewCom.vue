<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header><v-spacer></v-spacer><span><v-icon>mdi-chat-plus</v-icon> Nouveau Commentaire</span></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-textarea v-model="newCom" label="nouveau commentaire"></v-textarea>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="cancelNewCom">Annuler</v-btn>
            <v-btn dark class="green darken-3" @click="newComment">Envoyer</v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "NewCom",


  data() {
    return {
        newCom:"",
        panel: []
    };
  },

  methods: {

    /** Permet de crée un nouveau commentaire a partir du textarea */
    newComment: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/comment/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postId: this.$route.params.id,
          content: this.newCom,
          userId: localStorage.getItem("userId"),
        }),
      }).then(() => window.location.reload());
    },

    /** Permet d'annuler le nouveau commentaire et fermer le panneau */
    cancelNewCom: function (e) {
      e.preventDefault();
        this.panel =[]
    },
  },
};
</script>