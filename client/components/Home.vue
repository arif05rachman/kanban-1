<template>
<div class="home ">
  <Navbar @logouted="logouted"> </Navbar>
  <Category></Category>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import Category from '../components/Category'
export default {
  name: 'Home',
  components: {
        Navbar,
        Category,
  },
  data(){
    return{
    }
  },
  methods:{
    logouted(){
      this.$emit('logouted')
    }
  }
}
</script>

<style scoped>
.home{
  height: 100vh;
  min-height: 700px;
}
</style>