<template>
    <div class="wrap">
        <div class="post">
            <div class="post_info">
                <div class="post_info_user">
                    <img src="@/assets/img/icon.svg" alt />
                    <h4>{{ post.user.username }}</h4>
                </div>
                <h3>{{ post.title }}</h3>
                <p
                    v-if="post.createdAt === post.updatedAt"
                >Posté le: {{ formatDate(post.createdAt) }}</p>
                <p v-else>
                    Posté le: {{ formatDate(post.createdAt) }} Modifié:
                    {{ formatDate(post.updatedAt) }}
                </p>
            </div>
            <div class="post_content">
                <p>{{ post.content }}</p>
            </div>
            <div class="post_likecombar">
                <p>Commentaire ({{ post.comments }})</p>
                <span></span>
                <p>like</p>
            </div>
        </div>-->
    </div>
</template>
  
  <script>
import dayjs from "dayjs";

export default {
    name: "PostComponent",

    data() {
        return{
            post: []
        }
    },

    methods: {
        
        formatDate(dateString) {
            const date = dayjs(dateString);
            return date.format("HH:mm - D MMM 'YY");
        },

    },

    async created() {
        let url = document.location.pathname.split('/')[2].replace(/"/g,'')
        await fetch(`http://localhost:3010/post/${url}`)
            .then((res) => res.json())
            .then((data) => (this.post = data))
            .catch((err) => console.log(err.message));
    },
};
</script>
  
  