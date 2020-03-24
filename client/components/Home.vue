<template>
<div class="home ">
  <Navbar @logouted="logouted"> </Navbar>
  <div class="container-fluid py-2">
      <b-row>
        <b-col v-for="category in categories" :key="category.id" class="">
          <Category :category="category"
            @processDeleteTask="processDeleteTask"
            @processMoveToLeft="processMoveToLeft"
            @processMoveToRight="processMoveToRight"
            @processUpdateTask="processUpdateTask"
            @processAddTask="processAddTask"
          ></Category>
        </b-col>
      </b-row>
  </div>
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
      categories: []
    }
  },
  methods:{
    logouted(){
      this.$emit('logouted')
    },
    getAllTask(){
      this.$axios({
        method: 'get',
        url: '/categories',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.categories = data
      })
      .catch(({response})=>{
        let errorMessage = response.data.message
        this.$swal.fire({
          icon: 'error',
          title: 'Failled to get Data Task',
          html: `${errorMessage}`,
          customClass: 'swal-wide',
        })
      })
    },
    processAddTask(newTask){
      this.getAllTask()
    },
    processDeleteTask(delTask){
      this.getAllTask()
    },
    processMoveToLeft(moveLeft){
      this.getAllTask()
    },
    processMoveToRight(moveRight){
      this.getAllTask()
    },
    processUpdateTask(update){
      this.getAllTask()
    }
  },
  created(){
    this.getAllTask()
  },
  sockets: {
    connect() {
      // console.log(`Socket is connected!`);
    },
    reloadTask(data) {
      this.getAllTask();
    }
  },
}
</script>

<style scoped>
.home{
  height: 100vh;
  min-height: 700px;
}
</style>