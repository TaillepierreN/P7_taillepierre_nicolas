<template>
  <div class="signup wrap">
    <h1>Création de compte</h1>
    <form id="signform" @submit="signForm" method="post" class="signup_div">
      <label class="email"
        >email:
        <input
          id="signmail"
          v-model="email"
          type="email"
          v-if="account === true"
        />
      </label>
      <label class="password"
        >password:
        <input
          id="signpass"
          v-model="password"
          type="text"
          v-if="account === true"
        />
      </label>
      <label class="username"
        >username:
        <input
          id="signuser"
          v-model="username"
          type="text"
          v-if="account === true"
        />
      </label>
      <button>S'enregistrer</button>
    </form>
  </div>
</template>
  
  <script>
export default {
  name: "SignComponent",
  components: {},
  props: {
    account: Boolean,
  },

  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },

  methods: {

    signForm: function (e) {
      e.preventDefault();
      fetch("http://localhost:3010/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          username: this.username,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    },

  }
  
};
</script>