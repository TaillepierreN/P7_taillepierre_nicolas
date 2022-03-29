<template>
  <div class="login wrap">
    <h1>Connexion</h1>
    <form id="logform" @submit="loginForm" method="post" class="login_div">
      <label class="email" >email: <input id="logmail" type="email" v-model="email" v-if='account === false' /> </label>
      <label class="password" >password: <input id="logpass" type="text" v-model="password" v-if='account === false' /> </label>
      <button>Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogComponent",
  components: {},
  props: {
    account: Boolean
  },
  data() {
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    loginForm: function(e){
      e.preventDefault();
      fetch("http://localhost:3010/auth/login", {
       method: "POST",
       body: JSON.stringify ({
         email: this.email,
         password: this.password
       }),
       headers:{
         "Content-type": "application/json"
       }
      })
      .then(res => res.json())
      .then(json => {
        window.localStorage.setItem("token", JSON.stringify(json.token));
        window.location.href= "/"
      });


    } 
  },
};
</script>