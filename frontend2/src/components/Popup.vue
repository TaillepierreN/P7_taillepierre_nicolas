<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red" dark v-bind="attrs" v-on="on"
        >Supprimer</v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="error" dark>Supprimer le compte</v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-12 wordbreakN">
            Voulez-vous définitivement supprimer le compte?
          </div>
        </v-card-text>
        <v-card-actions class="space-between">
          <v-btn text @click="dialog.value = false">Non</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="delUsr">Oui</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "PopUp",

  methods: {

    /** Permet de supprimer l'utilisateur */
    delUsr: function (e) {
      e.preventDefault();
      fetch(`http://localhost:3010/user/${this.$route.params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }).then(() => (window.location.href = "/login"));
    },
  },
};
</script>
