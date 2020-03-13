<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="">
      <b-navbar-brand href="#">KangBan App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{name}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="processLogout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      name: localStorage.getItem('name')
    }
  },
  methods:{
    processLogout(){
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      this.$emit('logouted')
    }
  }
}
</script>

<style>

</style>