<template>
  <div class="signup wrap">
    <h1>Création de compte</h1>
    <div class="signup_div">
      <label class="email" for=""
        >email: <input type="email" v-if='account === true'/>
      </label>
      <label class="password" for="">password: <input type="text" v-if='account === true' /> </label>
      <label class="username" for="">username: <input type="text" v-if='account === true' /> </label>

      <button>S'enregistrer</button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "SignComponent",
  components: {},
  props: {
    account: Boolean,
  },
};
</script>