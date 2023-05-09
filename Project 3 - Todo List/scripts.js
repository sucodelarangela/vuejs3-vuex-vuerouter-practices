const TodoList = {
  data() {
    return {
      tasks: [],
      newTask: {
        done: false
      }
    };
  },
  methods: {
    addNewTask: function () {
      if (this.newTask.description) {
        this.tasks.push(this.newTask);
        this.newTask = { done: false };
      } else {
        alert('O texto da tarefa é obrigatório');
      }
    }
  }
};

Vue.createApp(TodoList).mount('#app');
