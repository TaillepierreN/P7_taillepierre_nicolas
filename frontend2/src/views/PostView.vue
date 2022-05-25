<template>
    <div class="home wrap">
        <v-card-title class="ma-auto center" v-if="this.post == null">Aucun post trouvé</v-card-title>
        <PostComponent
            v-else
            :post="post"
            :singlePost="true"
            :isUserOrAdmin="isUserOrAdmin"
        />
    </div>
</template>

<script>
import PostComponent from "@/components/PostComponent.vue";

export default {
    name: "PostView",
    components: {
        PostComponent,
    },
    data: () => ({
        post: null,
        isUserOrAdmin: false,
    }),

    mounted() {
        /** Récupère le post par son Id */
        fetch(`http://localhost:3010/post/${this.$route.params.id}`, {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => res.json())
        .then((data) => (this.post = data))
        .then(() => {
            /** Vérifie que l'utilisateur loggé est soit admin/mod soit le propriétaire */
            let uid = window.localStorage.getItem("userId");
            let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
            let mod = JSON.parse(window.localStorage.getItem("isMod"));
            if (this.post.user.id == uid || admin == true || mod == true) {
                this.isUserOrAdmin = true;
            }
        })
        .catch((err) => {
            this.post = null
            console.log(err.message)})
        }
    }
</script>