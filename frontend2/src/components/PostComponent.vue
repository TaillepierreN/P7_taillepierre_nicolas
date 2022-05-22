<template>
  <v-container>
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 0.5,
      }"
      min-height="200"
      transition="fade-transition"
    >
      <v-layout align-center justify-center>
        <v-card elevation="1" class="mt-10 mb-5" width="800">
          <v-row no-gutters class="post_userinfo">
            <v-avatar size="55" class="ms-5 my-2">
              <img
                :src="editPost.user.profilepic"
                alt="Image de profile"
                v-if="editPost.user.profilepic != null"
              />
            </v-avatar>
            <div>
              <router-link
                v-if="!ownuser"
                :to="{ name: 'profile', params: { id: editPost.user.id } }"
              >
                <h3 class="ml-5">
                  {{ editPost.user.username }}
                </h3>
              </router-link>
              <router-link
                v-else
                :to="{ name: 'profile', params: { id: editPost.user.id } }"
              >
                <h4 class="red--text ml-5">
                  {{ editPost.user.username }}
                </h4>
              </router-link>
              <div class="grey--text ms-5 text-caption">
                {{ formatDate(editPost.createdAt) }}
              </div>
              <div
                class="grey--text ms-5 text-caption"
                v-if="editPost.createdAt != editPost.updatedAt"
              >
                (modifié:{{ formatDate(editPost.updatedAt) }})
              </div>
            </div>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-container>
              <router-link
                v-if="!singlePost"
                class="post_title"
                :to="{ name: 'posts', params: { id: editPost.id } }"
              >
                <h2 class="black--text">
                  {{ editPost.title }}
                </h2>
                <v-card-text class="black--text">
                  {{ editPost.content }}
                </v-card-text>
                <v-img :src="editPost.attachment"> </v-img>
              </router-link>
              <div v-else>
                <h2>
                  {{ editPost.title }}
                </h2>
                <v-card-text>
                  {{ editPost.content }}
                </v-card-text>
                <v-img :src="editPost.attachment"> </v-img>
              </div>
            </v-container>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-btn plain outlined text @click="likeswitch" class="ml-1 my-1">
              <v-icon left v-if="!hasLiked">mdi-thumb-up-outline</v-icon>
              <v-icon left v-else class="green--text">mdi-thumb-up</v-icon>
              <span v-if="this.postlikesCount != 0">{{
                this.postlikesCount
              }}</span>
              <span v-else>Like</span>
            </v-btn>
            <v-btn plain outlined text class="ml-1 my-1">
              <router-link
                class="post_comment_btn black--text"
                :to="{ name: 'posts', params: { id: editPost.id } }"
              >
                <v-icon left>mdi-comment-multiple</v-icon> comment
                <span v-if="(this.postCommentCount > 0) & (singlePost == true)"
                  >({{ this.postCommentCount }})</span
                >
              </router-link>
            </v-btn>
            <v-spacer></v-spacer>
            <del-post-component
              v-if="singlePost == true && isUserOrAdmin == true"
              :editPost="this.editPost"
            />
            <edit-post-component
              v-if="singlePost == true && isUserOrAdmin == true"
              :editPost="this.editPost"
            />
          </v-row>
        </v-card>
      </v-layout>
    </v-lazy>
    <v-card
      v-if="singlePost"
      id="commentSection"
      width="1500"
      class="ma-auto"
      justify-center
      align-center
    >
      <NewCom />
      <CommentComponent
        :comment="comment"
        v-for="comment in comments"
        :key="comment.id"
        :postId="editPost.id"
      />
    </v-card>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import EditPostComponent from "./EditPostComponent.vue";
import DelPostComponent from "./DelPostComponent.vue";
import CommentComponent from "@/components/CommentComponent.vue";
import NewCom from "@/components/NewCom.vue";
require("dayjs/locale/fr");

export default {
  name: "PostComponent",
  props: ["post", "singlePost", "isUserOrAdmin"],
  components: {
    EditPostComponent,
    DelPostComponent,
    CommentComponent,
    NewCom,
  },

  data() {
    return {
      editPost: { ...this.post },
      comments: [],
      acceptedFile: [
        "imgage/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/gif",
      ],
      addComment: false,
      hasLiked: false,
      postlikesCount: 0,
      postCommentCount: 0,
      ownuser: false,
      isActive: false,
    };
  },
  mounted() {
    dayjs.locale("fr");

    /** Range les commentaire du plus récent au plus ancien */
    this.comments = this.post.comments;
    if (this.comments) {
      this.comments = this.comments.reverse();
    }

    /** Compte les commentaire et les likes */
    let uid = window.localStorage.getItem("userId");
    this.postlikesCount = this.editPost.likes.length;
    if (this.singlePost) {
      this.postCommentCount = this.editPost.comments.length;
    }

    /** Vérifie si l'utilisateur a liké ce post */
    let liketable = this.editPost.likes;
    liketable.forEach((element) => {
      if (element.userId == uid) {
        return (this.hasLiked = true);
      }
    });

    /** Vérifie si l'utilisateur connecté est le propriétaire du post */
    if (this.editPost.user.id == uid) {
      return (this.ownuser = true);
    }
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("D MMM 'YY à HH:mm");
    },

    /** Permet de liké ou retirer le like du post */
    likeswitch(e) {
      e.preventDefault();
      fetch(`http://localhost:3010/post/${this.post.id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      }).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>