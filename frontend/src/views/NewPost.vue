<template>
  <div class="home">
    <NewPostComponent/>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import NewPostComponent from "@/components/NewPostComponent.vue";

export default {
  name: "NewPostView",
  components: {
    NewPostComponent,
  },
  data: () => ({
    post: null,
  }),

  mounted() {

  },

  methods:{

  }
};
</script>
  