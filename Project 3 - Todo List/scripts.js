const TodoList = {
  data() {
    return {
      tasks: localStorage.getItem,
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
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } else {
        alert('O texto da tarefa é obrigatório');
      }
    },
    // storeTasks() {
    //   localStorage.setItem('tasks', JSON.stringify(this.tasks));
    //   console.log('updated');
    // }
  },
  // LIFECYCLE HOOK: carregaremos os dados do localStorage antes da inicialização / geração do HTML com `created()`
  created() {
    this.tasks = localStorage.getItem('tasks') ?
      JSON.parse(localStorage.getItem('tasks')) :
      this.tasks;
  },
  // Ao atualizar o componente / lista de todos, mandamos a lista nova para o localStorage com o `updated()`
  // NOTA 1 
  updated() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    console.log('updated');
  }
};

Vue.createApp(TodoList).mount('#app');

/*

NOTA 1: Da forma que fizemos, sempre que digitarmos no input, o localStorage será atualizado. Em uma aplicação pequena como essa, não teremos problemas de performance, pois é algo muito pequeno. No entanto, para aplicações de maior porte, isso pode ser problemático.

Para contornar isso, criamos um novo método em `methods` que faz essa atualização do localStorage (conforme feito em `updated()`), mas sendo executado somente quando quisermos, por exemplo, em um evento de `click` ou `submit` no HTML.

Este não é um método tão eficiente, pois precisaríamos executar esse método em vários locais diferentes, o que pode gerar complicações quando for necessário manutenibilidade. Mas para aplicações de maior porte, pode ser melhor para performance.

*/
