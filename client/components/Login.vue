<template>
    <b-card class="d-flex justify-content-center align-items-center full-h middle-center">
      <div>
        <h1>KangBan App</h1>
      </div>
      <b-card>
        <div>
          <h3>Login</h3>
        <hr>
        <div class="d-flex flex-column align-items-center">
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
          <h5>Or</h5>
        </div>
        </div>
        <b-form @submit.prevent="processLogin(email, password)">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              v-model="email"
              id="input-1"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              v-model="password"
              id="input-2"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
        <div class="mt-4 text-right">
          <a href="#" @click.prevent="callRegisterPage()"><span>You not have account?</span></a>
        </div>
      </b-card>
    </b-card>
</template>

<script>
  import GoogleLogin from 'vue-google-login';
  export default {
    name: 'Login',
    data(){
      return { 
        email: null,
        password: null,
        params: {
                    client_id: "255521937375-dkbj7vrcopqel2nbdf0hkb4u5d8qc2sr.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 180,
                    height: 30,
                    longtitle: true
        }
      }
    },
    components:{
      GoogleLogin
    },
    methods: {
      callRegisterPage(){
        this.$emit('callRegisterPage')
      },
      processLogin(){
        this.$axios({
          method: 'post',
          url: '/user/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(({data}) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          this.$emit('logged', localStorage.getItem('token'))
          this.$emit('loginPageSetter')
          this.$swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            html: `Welcome ${data.name} to KangBan Apps`,
          })
        })
        .catch(({response}) => {
          console.log('login error')
          let errorMessage = response.data.message
          this.$swal.fire({
            icon: 'error',
            title: 'Login Failled',
            html: `${errorMessage}`,
          })
        })
      },
      onSuccess(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        this.$axios({
          method: 'post',
          url: '/user/loginGoogle',
          data: {
            id_token: id_token
          }
        })
        .then(({data})=>{
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          this.$emit('logged', localStorage.getItem('token'))
          this.$emit('loginPageSetter')
          this.$swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            html: `Welcome ${data.name} to KangBan Apps`,
          })
        })
        .catch(({response})=>{
          console.log('login error')
          let errorMessage = response.data.message
          this.$swal.fire({
            icon: 'error',
            title: 'Login Failled',
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