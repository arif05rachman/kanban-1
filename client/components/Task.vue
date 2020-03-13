<template>
  <div class="task">
    <div v-if="tasks.length > 0" >
      <b-card v-for="task in tasks" :key="task.id" class="mb-2">
        <b-card-text >
          {{task.title}}.
        </b-card-text>
        <hr class="py-0 my-0">
          <div class="d-flex justify-content-between py-0 my-0" style="font-size: 2rem;">
            <a href="#"  class="" v-if="task.CategoryId != 1">
              <b-icon icon="arrow-left-short" variant="info" class="border border-info rounded" @click.prevent="moveToLeft(task)">
              </b-icon>
            </a>
            <a href="#"  class="">
              <b-icon icon="trash" variant="danger" class="border border-danger rounded" @click.prevent="removeTask(task)">
              </b-icon>
            </a>
            <a href="#"  class="">
              <b-icon icon="pencil" variant="warning" class="border border-warning rounded" @click.prevent="editTask(task)">
              </b-icon>
            </a>
            <a href="#"  class="" v-if="task.CategoryId !== 4">
              <b-icon icon="arrow-right-short" variant="success" class="border border-success rounded" @click.prevent="moveToRight(task)">
              </b-icon>
            </a>
          </div>
      </b-card>
    </div>
    <div v-else>
      <b-card>
        <b-card-text class="text-center text-black-50">
          <h5>add some task</h5>
        </b-card-text>
      </b-card>
    </div>
    <!-- Modal Edit -->
    <div>
    <b-modal v-model="editForm"
    @ok="onEditModalOk(dataEdit)"
    >
      <b-form @submit.prevent="processEditTask(title)">
        <b-form-group id="input-group-task" label="Task Title:" label-for="input-task">
        <b-form-input
          v-model="dataEdit.title"
          required
          placeholder="Enter Title"
          ></b-form-input>
        </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'Task',
  props: ['tasks'],
  data() {
    return {
      editForm: false,
      modalShow: false,
      title: '',
      dataEdit: {
      }
    }
  },
  methods: {
    removeTask(data){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            this.$axios({
              method: 'delete',
              url: '/tasks/'+data.id,
              headers: {
                token: localStorage.getItem('token')
              }
            })
          .then(({data})=>{
            this.$emit('processDeleteTask', data)
            this.$swal.fire(
              {
                title: 'Deleted!',
                html: 'Your task has been deleted.',
                customClass: 'swal-wide',
              }
            )
            console.log(data)
          })
          .catch(({response})=>{
            console.log(response)
          })
        }
      })
    },
    moveToLeft(data){
      console.log(data.CategoryId-1)
      this.$axios({
        method: 'patch',
        url: '/tasks/'+data.id,
        data: {
          CategoryId: data.CategoryId-1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.$emit('processMoveToLeft', data)
        console.log(data)
      })
      .catch(({response})=>{
        console.log(response)
      })
    },
    moveToRight(data){
      this.$axios({
        method: 'patch',
        url: '/tasks/'+data.id,
        data: {
          CategoryId: data.CategoryId+1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data)
        this.$emit('processMoveToRight', data)
      })
      .catch(({response})=>{
        console.log(response)
      })
    },
    onEditModalOk(data){
      this.$axios({
        method: 'put',
        url: '/tasks/'+data.id,
        data: {
          title: data.title,
          CategoryId: data.CategoryId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.$emit('processUpdateTask', data)
        this.$swal.fire(
          {
            title: 'Updated!',
            html: 'Your task has been Updated.',
            customClass: 'swal-wide',
          }
        )
        console.log(data)
      })
      .catch(({response})=>{
        console.log(response)
      })
    },
    editTask(data){
      this.editForm = !this.editForm
      this.dataEdit = data
    }
  }
}
</script>

<style scoped>

</style>