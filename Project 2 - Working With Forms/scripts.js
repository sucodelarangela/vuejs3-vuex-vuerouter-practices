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
      this.members.push(this.newMember);
    }
  }
};

Vue.createApp(handlingForms).mount('#app');
