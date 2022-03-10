<template>
  <div class="home">
    <PostComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'

export default {
  name: "HomeView",
  components: {
    PostComponent
  },
  props:[]
};
</script>
