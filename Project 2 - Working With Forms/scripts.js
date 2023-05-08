members = [
  {
    fname: 'John',
    lname: 'Lennon',
    instrument: 'Violão'
  },
  {
    fname: 'George',
    lname: 'Harrison',
    instrument: 'Guitarra'
  }
];

const handlingForms = {
  data() {
    return {
      members: members,
      // Aqui guardaremos os valores inseridos pelo usuário nos inputs do formulário, a serem capturados via diretiva `v-model`. Podemos declarar as propriedades como `null` ou simplesmente deixar o objeto vazio, que o v-model automaticamente cria as propriedades com seus valores
      newMember: {}
    };
  },
  methods: {
    addMember: function () {
      if (this.newMember.fname && this.newMember.lname && this.newMember.instrument) {
        this.members.push(this.newMember);
        // Passamos um objeto vazio tanto para limpar os campos de input quanto para desativar o two-way data binding, que poderia permitir que o dado fosse modificado novamente pelo input
        this.newMember = {};
      } else {
        alert('All fields are required');
      }
    }
  }
};

Vue.createApp(handlingForms).mount('#app');
