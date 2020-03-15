<template>
  <div class="container-fluid py-2">
      <b-row>
        <b-col v-for="category in categories" :key="category.id" class="">
          <!-- <b-card class="mb-0 p-0"> -->
          <!-- </b-card> -->
          <div style="max-width: 300px">
          <b-card>
            <h4 class="text-center">{{category.name}}</h4>
            <hr>
            <Task v-bind:tasks="category.Tasks" :CategoryId="category.id" 
            @processDeleteTask="processDeleteTask"
            @processMoveToLeft="processMoveToLeft"
            @processMoveToRight="processMoveToRight"
            @processUpdateTask="processUpdateTask"
            class="scroll"></Task>
          </b-card>
          <b-card>
            <div class="col">
            <div class="d-flex justify-content-center my-2">
              <AddTask :CategoryId="category.id" @processAddTask="processAddTask"></AddTask>
            </div>
            </div>
            <div>
            </div>
          </b-card>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Task from './Task'
import AddTask from './AddTask'
export default {
  name: 'Category',
  components: {
    Task,
    AddTask
  },
  data: function  (){
    return {
      categories: [],
      }
  },
  sockets: {
    connect() {
      // console.log(`Socket is connected!`);
    },
    reloadTask(data) {
      this.getAllTask();
    }
  },
  methods: {
    processAddTask(newTask){
      this.getAllTask()
    },
    processDeleteTask(delTask){
      // console.log(delTask)
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
    }
  },
  created(){
    this.getAllTask()
  },
}
</script>

<style scoped>
.scroll{
  max-height: 68vh;
  /* min-height: 500px; */
  overflow-y: auto;
}
.card-body{
  padding-top: 0 rem;
  padding-bottom: 0 rem;
  /* margin-top: 0rem;
  margin-bottom: 0rem ; */
}
</style>