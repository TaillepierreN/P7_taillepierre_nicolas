<template>
  <div class="home">
    <PostsComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsComponent from '@/components/PostsComponent.vue'

export default {
  name: "HomeView",
  components: {
    PostsComponent
  },
  props:[]
};
</script>
