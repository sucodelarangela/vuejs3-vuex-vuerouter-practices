const tasks = [
  { description: 'Aprender HTML, CSS e Javascript', done: true },
  { description: 'Aprender o básico de Vue JS', done: false },
  { description: 'Completar o desafio de Vue JS com excelência', done: false }
];

const TodoList = {
  data() {
    return {
      tasks: tasks,
      newTask: {}
    };
  },
  methods: {
    addNewTask: function () {
      if (this.newTask.description) {
        this.tasks.push({
          description: this.newTask.description,
          done: false
        });
        newTask = {};
      }
    }
  }
};

Vue.createApp(TodoList).mount('#app');
