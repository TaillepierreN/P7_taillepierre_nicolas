<template>
  <main class="logsign wrap">
    <div class="logpanel">
      <LogComponent :account="ownAccount" v-if="ownAccount === true" />
      <SignComponent :account="ownAccount" v-else />
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <p v-if="ownAccount === true">
            Pas de compte?
            <a @click="ownAccount = false" class="blue--text text--darken-3">S'inscrire</a>
          </p>
          <p v-if="ownAccount === false">
            Vous possédez déja un compte?
            <a @click="ownAccount = true" class="blue--text text--darken-4">Se connecter</a>
          </p>
        </v-flex>
      </v-layout>
    </div>
  </main>
</template>

<script>
import LogComponent from "@/components/LogComponent.vue";
import SignComponent from "@/components/SignComponent.vue";

export default {
  name: "LoginView",
  components: {
    LogComponent,
    SignComponent,
  },

  data() {
    return {
      ownAccount: true,
    };
  },
  mounted(){
    /** Change le component en fonction de la route */
    if (this.$route.name == "signup"){
      return this.ownAccount = false
    }
  }
};
</script>
