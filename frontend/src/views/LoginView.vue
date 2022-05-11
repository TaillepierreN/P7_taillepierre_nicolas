<template>
  <main class="logsign wrap">
    <img src="@\assets\img\icon-above-font.svg" alt="Logo Groupomania" class="logsignimg">
    <div class="logpanel">
      <LogComponent :account="ownAccount" />
      <SignComponent :account="ownAccount" />
    </div>
    <div class="slidingpanel">
      <router-link
        to="/login"
        v-show="ownAccount"
        @click="ownAccount = !ownAccount"
        class="sliderlog"
      >
        <p>Vous possèdez deja un compte?</p>
        <h2>Se connecter</h2>
      </router-link>
      <router-link
        to="/signup"
        v-show="!ownAccount"
        @click="ownAccount = !ownAccount"
        class="slidersign"
      >
        <p>Pas de compte?</p>
        <h2>S'enregistrer</h2>
      </router-link>
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
      ownAccount: false,
    };
  }

};
</script>
