<template>
<div >
    <Login v-if="loginPage && !isLogin" v-on:callRegisterPage="callRegisterPage" v-on:loginPageSetter="loginPageSetter"></Login>
    <Register v-if="registerPage && !isLogin" v-on:callLoginPage="callLoginPage" @logged="logged"></Register>
    <Home v-if="isLogin" @logouted="logouted"></Home>

</div>
</template>

<script>
import axios from 'axios';
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
export default {
  name : "App",
  components: {
    Login,
    Register,
    Home
  },
  mounted() {
    if (this.token) {
      this.isLogin = true
      this.loginPage = false
      this.registerPage = false
    } else {
      this.isLogin = false
      this.loginPage = true
      this.registerPage = false
    }
  },
  data(){
    return {
      isLogin : false,
      loginPage : true,
      registerPage : false,
      // homePage : false,
      nameNav: localStorage.getItem('name'),
      token: localStorage.getItem('token')
      }
  },
  methods: {
    callRegisterPage(){
      this.loginPage = false
      this.registerPage = true
    },
    callLoginPage(){
      this.loginPage = true
      this.registerPage = false
    },
    logged(data){
      this.loginPage = !this.isLoginPage
      this.isLogin = true
      this.token = localStorage.getItem('token')
    },
    loginPageSetter() {
      this.loginPage = !this.isLoginPage
      this.isLogin = true
      this.token = localStorage.getItem('token')
    },
    logouted(){
      this.isLogin = localStorage.getItem('token')
      this.loginPage = true
      this.registerPage = false
      this.homePage = false
    }
  },
  // watch(){
  //   token
  // }
}
</script>

<style>
/* body{ */
  /* overflow: hidden; */
/* } */
.full-h {
  height: 100vh;
}
.swal-wide{
    width:400px !important;
    padding: 0rem;
    margin: 0rem;
    font-size-adjust: inherit;
}
</style>