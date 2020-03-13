import Vue from 'vue'
import App from './App.vue';
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import GAuth from 'vue-google-oauth2'
const base = axios.create({
  baseURL: 'http://localhost:3000'
});
const gauthOption = {
  clientId: '831032422222-1vo1hs36kr7vtu6vajsialdf5bb57ms9.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.prototype.$axios = base;
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// SweetAlert
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
}).$mount('#app');