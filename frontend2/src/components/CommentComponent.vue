<template>
    <v-lazy
        v-model="isActive"
        :options="{
        threshold: 0.5,
        }"
        transition="fade-transition"
    >
        <v-container>
        <v-row no-gutter>
            <v-col cols="2" class="pt-1 com_user">
                <v-layout class="com_user_nameplate" align-center>
                    <v-avatar size="65">
                        <v-img :src="editComment.user.profilepic"></v-img>
                    </v-avatar>
                    <v-card-title class="com_user_name">{{ editComment.user.username }}</v-card-title>
                </v-layout>
                <v-card-subtitle class="pa-0">
                    {{ formatDate(editComment.createdAt) }}
                </v-card-subtitle>
                <v-card-subtitle
                    class="pa-0 font-italic font-weight-light"
                    v-if="editComment.createdAt != editComment.updatedAt"
                >
                    ({{ formatDate(editComment.updatedAt) }})
                </v-card-subtitle>
            </v-col>
            <v-col cols="8" class="com_content mb-2">
                <v-textarea v-if="editCom == true" v-model="modifiedContent">
                </v-textarea>
                <v-container v-else>
                    {{ editComment.content }}
                </v-container>
            </v-col>
            <v-col cols="2" class="com_btn" v-if="comUserOrAdmin">
                <v-btn
                    v-if="editCom == true"
                    @click="editCmt"
                    tile
                    width="100%"
                    dark
                    class="mb-5 blue"
                    ><v-icon left>mdi-content-save</v-icon><span class="com_btn_text">Sauvegarder</span></v-btn
                >
                <v-btn
                    v-if="editCom == true"
                    @click="annulCmt"
                    tile
                    width="100%"
                    class="mb-5"
                    ><v-icon left>mdi-undo</v-icon><span class="com_btn_text"> Annuler</span></v-btn
                >
                <v-btn
                    v-if="editCom == true"
                    @click="delCmt"
                    tile
                    width="100%"
                    dark
                    class="mb-5 red lighten-1"
                    ><v-icon left>mdi-delete-forever</v-icon><span class="com_btn_text">Supprimer</span></v-btn
                >
                <v-btn
                    v-else-if="comUserOrAdmin"
                    @click="editCom = !editCom"
                    tile
                    width="100%"
                    class="mb-5"
                    ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
                >
            </v-col>
        </v-row>
        <v-divider></v-divider>
        </v-container>
    </v-lazy>
</template>

<script>
import dayjs from "dayjs";
require("dayjs/locale/fr");

export default {
    name: "CommentComponent",
    props: ["comment", "postId"],

    data() {
        return {
        comUserOrAdmin: false,
        editComment: { ...this.comment },
        editCom: false,
        isActive: false,
        modifiedContent: ""
        };
    },

    methods: {
        formatDate(dateString) {
        const date = dayjs(dateString);
        return date.format("D/MM/YY à HH:mm");
        },

        editCmt: function (e) {
        e.preventDefault();
        fetch(`http://localhost:3010/comment/${this.comment.id}`, {
            method: "PUT",
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-type": "application/json",
            },
            body: JSON.stringify({
            content: this.modifiedContent,
            }),
        }).then(() => {
            this.editCom = false;
            window.location.reload();
        });
        },

        delCmt: function (e) {
        e.preventDefault();
        fetch(`http://localhost:3010/comment/${this.comment.id}`, {
            method: "DELETE",
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(() => window.location.reload());
        },

        annulCmt: function (e) {
        e.preventDefault();
        this.editComment.content = this.comment.content;
        this.editCom = false;
        },
    },

    mounted() {
        let uid = window.localStorage.getItem("userId");
        let admin = JSON.parse(window.localStorage.getItem("isAdmin"));
        let mod = JSON.parse(window.localStorage.getItem("isMod"));
        if (this.comment.user.id == uid || admin == true || mod == true) {
        this.comUserOrAdmin = true;
        }
        this.modifiedContent = this.editComment.content
        dayjs.locale("fr");
    },
};
</script>