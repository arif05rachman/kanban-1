<template>
    <b-card class="d-flex justify-content-center align-items-center full-h middle-center">
      <div>
        <h1>KangBan App</h1>
      </div>
      <b-card>
        <div>
          <h3>Register</h3>
        <hr>
        </div>
      <b-form @submit.prevent="processRegister(email, name, password)">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input
            v-model="name"
            id="input-2"
            type="text"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            v-model="password"
            id="input-3"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <div class="mt-4 text-right">
        <a href="#" @click.prevent="callLoginPage()"><span>You already have account?</span></a>
      </div>
    </b-card>
</template>

<script>
// import axios from 'axios'
  export default {
    name: 'Register',
    data() {
      return {
        email: null,
        name: null,
        password: null
      }
    },
    methods: {
      callLoginPage(){
        this.$emit('callLoginPage')
      },
      processRegister(){
        this.$axios({
          method: 'post',
          url: '/user/register',
          data: {
            email: this.email,
            name: this.name,
            password: this.password
          }
        })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          this.$emit('logged')
          this.$swal.fire({
            icon: 'success',
            title: 'Register Successfully',
            html: `Welcome ${data.name} to KangBan Apps`,
          })
        })
        .catch(({response}) => {
          let errorMessage = ''
          response.data.message.forEach(element => {
            errorMessage += `${element}<br>`
          });
          this.$swal.fire({
            icon: 'error',
            title: 'Register Failled',
            html: `${errorMessage}`,
          })
        })
      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rock+Salt&display=swap');
h1{
  font-family: 'Rock Salt', cursive;
  text-align: center;
  margin-bottom: 100px;
}
h3{
  text-align: center;
}
</style>