<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
        Nouveau post
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="error" dark>Nouveau Post</v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              id="post_title"
              name="Titre"
              label="Titre"
              v-model="post.title"
              :rules="fieldRules"
            ></v-text-field>
            <v-textarea
              id="post_content"
              auto-grow
              color="blue"
              label="Contenu du post"
              v-model="post.content"
              :rules="fieldRules"
            ></v-textarea>
            <v-file-input
              id="post_image"
              accept="image/png, image/jpeg, image/gif , image/webp, image/jpeg"
              placeholder="Ajouter une image(optionel)"
              prepend-icon="mdi-camera"
              label="Ajouter une image (optionel)"
              v-model="post.image"
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
          <v-btn class="green" dark text @click="newpost">Poster</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "NewPost",

  data() {
    return {
      post: {
        title: "",
        content: "",
        image: null,
      },
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
    newpost: function (e) {
      e.preventDefault();
      let isValid = this.$refs.form.validate();
      if (isValid == true) {
        const formData = new FormData();
        formData.append("title", this.post.title);
        formData.append("content", this.post.content);
        formData.append("userId", window.localStorage.getItem("userId"));
        formData.append("type", "post");
        formData.append("image", this.post.image);
        fetch("http://localhost:3010/post", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => (window.location.href = "/post/" + data.id))
          .catch((error) => alert(error.message));
      }
    },
    onFileChange() {
      if (this.post.image) {
        const file = this.post.image;
        if (!this.acceptedFile.includes(file.type)) {
          this.post.image = null;
          return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
        }
        this.previewurl = URL.createObjectURL(file);
      } else {
        this.post.image = null;
        this.previewurl = "";
      }
    },
  },

  mounted() {},
};
</script>
