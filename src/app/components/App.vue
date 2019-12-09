<template>
<div>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="/">MEVN STACK</a>
  </nav>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="addTask">
              <div class="form-group">
                <input name="" id="" type="text" placeholder="Insert Task" class="form-control" v-model="task.title">
              </div>
              <div class="form-group">
                <textarea name="" id="" cols="30" rows="10" placeholder="Insert Description" class="form-control" v-model="task.description"></textarea>
              </div>
              <button class="btn btn-primary btn-block">Save</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="itemTask of listTask" v-bind:key="itemTask.id">
              <td>{{itemTask.title}}</td>
              <td>{{itemTask.description}}</td>
              <td>
                <button class="btn btn-success" @click="editTask" :data-id="itemTask._id">Edit</button>
                <button class="btn btn-danger" @click="deleteTask" :data-id="itemTask._id"> Delete</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>


<script>
class Task {
  constructor(id=0,title="",description=""){
    this._id = id;
    this.title = title;
    this.description = description;
  }
}

export default {
  data(){
    return {
      task: new Task(),
      listTask:[]
    }
  },
  async created(){
    await this.getListTask()
  },
  methods:{
    async addTask(){
      let message = 'Task Add Error';
      try {
        const objPropertiesFetch = {
          method: 'POST',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch('/api/tasks', objPropertiesFetch);
        const data = await response.json();
        if (data && data._id) {
          message = 'Task Add Success';
          const listTask = [...this.listTask];
          listTask.push(data);
          this.listTask = listTask;
          this.task.title = '';
          this.task.description = '';
        }
      } catch (error) {
        console.error("App.vue/addTask=>", error);
      }
      finally {
        alert(message)
      }
    },
    async getListTask() {
      try {
        const objPropertiesFetch = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch('/api/tasks', objPropertiesFetch);
        const data = await response.json();
        if (Array.isArray(data)) this.listTask = [...data];
      } catch (error) {
        console.error("App.vue/getListTask=>", error);
      }
    },
    async editTask(event) {
      let message = 'Task Edit Error';
      try {
        const objPropertiesFetch = {
          method: 'PUT',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const idTask = event.target.dataset.id;
        const response = await fetch(`/api/tasks/${idTask}`, objPropertiesFetch);
        const data = await response.json();
        if (data.ok) {
          message = 'Task Edit Success';
          const listTask = this.listTask.map((itemTask => {
            if (itemTask._id === idTask) return (Object.assign(data, { title: this.task.title, description: this.task.description }));
            else return itemTask;
          }).bind(this));
          this.listTask = listTask;
        }
      } catch (error) {
        console.error("App.vue/editTask=>", error);
      }
      finally {
        alert(message)
      }
    },
    async deleteTask(event) {
      if (confirm("You want to delete a record")) {
        let message = 'Task Delete Error';
        try {
          const objPropertiesFetch = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
          const idTask = event.target.dataset.id;
          const response = await fetch(`/api/tasks/${idTask}`, objPropertiesFetch);
          const data = await response.json();
          if (data.ok) {
            message = 'Task Delete Success';
            const listTask = this.listTask.filter(itemTask => itemTask._id !== idTask);
            this.listTask = listTask;
          }
        } catch (error) {
          console.error("App.js/deleteTask=>", error);
        }
        finally {
          alert(message);
        }
      }
    }
  }
}
</script>