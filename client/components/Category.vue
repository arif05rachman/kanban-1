<template>
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
    return {}
  },
  props: ["category"],
  methods: {
    processAddTask(newTask){
      this.$emit('processAddTask')
      // this.getAllTask()
    },
    processDeleteTask(delTask){
      // console.log(delTask)
      this.$emit('processDeleteTask')
      // this.getAllTask()
    },
    processMoveToLeft(moveLeft){
      this.$emit('processMoveToLeft')
      // this.getAllTask()
    },
    processMoveToRight(moveRight){
      this.$emit('processMoveToRight')
      // this.getAllTask()
    },
    processUpdateTask(update){
      this.$emit('processUpdateTask')
      // this.getAllTask()
    }
  },
  created(){
    this.$emit('processUpdateTask')
    // this.getAllTask()
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