<template>
  <div class="login">
    <h1>Connexion</h1>
    <form id="logform" @submit="loginForm" method="post" class="login_div">
      <label class="email"
        >email:
        <input
          id="logmail"
          type="email"
          v-model="email"
          v-if="account === false"
        />
      </label>
      <label class="password"
        >password:
        <input
          id="logpass"
          type="password"
          v-model="password"
          v-if="account === false"
        />
      </label>
      <p class="error" v-if="errormsg">{{ errormsg }}</p>
      <button>Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogComponent",
  components: {},
  props: {
    account: Boolean,
  },

  data() {
    return {
      email: "",
      password: "",
      errormsg: "",
    };
  },

  methods: {

    loginForm: function (e) {
      e.preventDefault();
      fetch("http://localhost:3010/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.token) {
            window.localStorage.setItem("token", json.token);
            window.localStorage.setItem("userId", json.userId);
            window.localStorage.setItem("isAdmin", json.isAdmin);
            window.location.href = "/";
          } else {
            return (this.errormsg = JSON.stringify(json));
          }
        });
    },
    
  },
};
</script>