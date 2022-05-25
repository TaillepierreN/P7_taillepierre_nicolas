<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="red darken-2" dark v-bind="attrs" v-on="on"
        >Supprimer</v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="error" dark>Supprimer le post</v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-12">
            Voulez vous définitivement supprimer le post?
          </div>
        </v-card-text>
        <v-card-actions class="space-between">
          <v-btn text @click="dialog.value = false">Non</v-btn>
          <v-spacer></v-spacer>
          <v-btn text class="red--text" @click="delMsg">Oui</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "DelPostComponent",
  props:[
    "editPost"
  ],

  methods: {
    
    /** Permet de supprimer un post */
    delMsg: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id: this.editPost.id,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }).then(() => (window.location.href = "/"));
    },
  },
};
</script>
