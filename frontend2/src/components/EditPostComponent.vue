<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
        Editer
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="error" dark>Editer le post</v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              id="post_title"
              name="Titre"
              label="Titre"
              v-model="edit.title"
              :rules="fieldRules"
            ></v-text-field>
            <v-textarea
              id="post_content"
              auto-grow
              color="blue"
              label="Contenu du post"
              v-model="edit.content"
              :rules="fieldRules"
            ></v-textarea>
            <v-file-input
              id="post_image"
              accept="image/png, image/jpeg, image/gif , image/webp, image/jpeg"
              placeholder="Ajouter une image(optionel)"
              prepend-icon="mdi-camera"
              label="Ajouter/Remplacer l'image (optionel)"
              v-model="edit.image"
              @change="onFileChange"
            ></v-file-input>
            <v-container>
              <v-layout>
                <v-card-text id="previewsign" v-if="previewurl"
                  >Aperçu:</v-card-text
                >
                <v-img :src="previewurl" alt="" max-width="200"></v-img>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="space-between">
          <v-btn text @click="dialog.value = false">Annuler</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="green" dark text @click="editMsg">Poster</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "EditPost",
  props: ["editPost"],

  data() {
    return {
      previewurl: "",
      fieldRules: [(v) => !!v || "Champ requis"],
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
    };
  },
  methods: {
    editMsg: function (e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", this.edit.id);
      formData.append("title", this.edit.title);
      formData.append("type", "post");
      formData.append("image", this.edit.image);
      formData.append("content", this.edit.content);
      fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        window.location.reload();
      });
    },
    onFileChange() {
      if (this.edit.image) {
        const file = this.edit.image;
        if (!this.acceptedFile.includes(file.type)) {
          this.edit.image = null;
          return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
        }
        this.previewurl = URL.createObjectURL(file);
      } else {
        this.edit.image = null;
        this.previewurl = "";
      }
    },
  },

  mounted() {
    this.edit = this.editPost;
  },
};
</script>
