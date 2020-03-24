<template>
  <div>
    <b-form @submit.prevent="processAddTask(title)">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          v-model="title"
          id="input-1"
          type="text"
          placeholder="add some task.."
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  props: ['CategoryId'],
  data(){
    return {
      title: ''
    }
  },
  methods:{
    processAddTask(){
      this.$axios({
        method: 'post',
        url: '/tasks',
        data: {
          title: this.title,
          CategoryId: this.CategoryId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.title = ''
        this.$emit('processAddTask', data)
        this.$swal.fire({
            icon: 'success',
            title: 'Add data Successfully',
            html: `${data.title}`,
            customClass: 'swal-wide',
          })
        // console.log(data)
      })
      .catch(({response})=>{
        // console.log(response)
        let errorMessage = ''
          response.data.message.forEach(element => {
            errorMessage += `${element}<br>`
          });
          this.$swal.fire({
            icon: 'error',
            title: 'Add data Failled',
            html: `${errorMessage}`,
            customClass: 'swal-wide',
          })
      })
    }
  }
}
</script>

<style>

</style>