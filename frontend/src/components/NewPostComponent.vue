<template>
  <div class="newpost" style="background-color: white">
    <h1>Poster un nouveau message</h1>
    <div class="newpost_bloc">
      <form @submit="newpost" class="newpost_form">
        <label for="">Titre: </label>
        <input type="text" v-model="post.title" />
        <label for="postcontent">Contenu: </label>
        <textarea
          name=""
          id="postcontent"
          cols="30"
          rows="10"
          v-model="post.content"
        ></textarea>
        <label for="image">image</label>
        <input
          id="image"
          @change="onFileChange"
          accept=".jpg, .jpeg, .png, .gif, .webp"
          type="file"
        />
        <div class="newpost_form_button">
          <button class="editbuttons">Enregistrer</button>
          <button type="button" class="editbuttons" @click="cancel">annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewPostComponent",

  data() {
    return {
      post: {
        title: "",
        content: "",
        image: null,
      },
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
      .then((window.location.href = "/"))
      .catch(error => alert(error.message))
    },

    cancel: function (e) {
      e.preventDefault();
      window.location.href = "/";
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!this.acceptedFile.includes(file.type)) {
        e.target.value = null;
        return alert("Seul les fichiers jpg,jpeg,webp,gif,png sont accepté");
      }
      this.post.image = file;
    },
  },
};
</script>
