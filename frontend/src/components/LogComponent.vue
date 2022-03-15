<template>
  <div class="login wrap">
    <h1>Connexion</h1>
    <div class="login_div">
      <label class="email" for="">email: <input type="email" v-if='account === false' /> </label>
      <label class="password" for="">password: <input type="text" v-if='account === false' /> </label>
      <button>Se connecter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogComponent",
  components: {},
  props: {
    account: Boolean
  }
};
</script>