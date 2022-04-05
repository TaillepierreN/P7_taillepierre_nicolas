<template>
  <div class="newpost" style="background-color: white">
    <h1>Poster un nouveau message</h1>
    <div class="newpost_bloc">
      <form @submit="newpost" class="newpost_form">
        <label for="">Titre: </label><input type="text" v-model="post.title" />
        <label for="">Contenu: </label
        ><textarea name="" id="" cols="30" rows="10" v-model="post.content"></textarea>
        <div class="newpost_form_button">
          <button>Enregistrer</button>
          <button>annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

export default {
    name: "NewPostComponent",

    data() {
        return{
            post:{
                title: '',
                content: ''
            }
        }
    },

    methods:{
        newpost: function(e){
            e.preventDefault();
            fetch("http://localhost:3010/post",{
                method: "POST",
                body: JSON.stringify({
                    title: this.post.title,
                    content: this.post.content,
                    userId: window.localStorage.getItem('userId')
                }),
                headers:{
                    "Content-type":"application/json"
                }
            })
                .then(window.location.href='/')
        }
    }
}
</script>
