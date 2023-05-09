<template>
  <div>
    <!-- A API da Open Trivia retorna algumas perguntas com HTML entities, que não são convertidas quando se usa Declarative Rendering (com {{}}). Para contornar isso, podemos renderizar o texto da API usando a diretiva `v-html`, que fará essa conversão: -->
    <h1 v-html="question"></h1>
    <template v-for="answer in answers" :key="answer">
      <input id="option" type="radio" name="options" value="answer" />
      <label for="option" v-html="answer"></label><br />
    </template>
    <button class="send" type="button">
      Send
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  // dados da aplicação/componente
  data() {
    return {
      question: undefined,
      incorrectAnswers: [],
      correctAnswer: undefined,
    };
  },
  // Para criar um array com todas as respostas, vamos criar uma computed property, pois não é uma boa prática fazer isso dentro dos lifecycle methods. Também faremos um shuffle de seus elementos, para variar a posição da resposta correta.
  // methods são usados para funções JS comuns. Já computed é utilizado para dados dinâmicos que gerarão novas renderizações dos componentes
  computed: {
    answers() {
      // Insere as respostas incorretas no array `answers`
      let answers = [...this.incorrectAnswers];
      // Sorteia um número aleatório até, no máximo, o comprimento do array acima
      let position = Math.floor(Math.random() * answers.length);
      // Insere na posição aleatória, sem eliminar nenhum elemento, a resposta correta
      answers.splice(position, 0, this.correctAnswer);
      return answers;
    }
  },
  // Lifecycle method: pegamos os dados da API assim que o app for inicializado
  created() {
    this.axios
      .get('https://opentdb.com/api.php?amount=1&category=18')
      .then(response => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
      });
  }
};
// API_URL: https://opentdb.com/api.php?amount=1&category=18
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type='radio'] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
