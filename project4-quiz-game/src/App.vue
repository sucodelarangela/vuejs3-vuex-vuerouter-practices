<template>
  <!-- passando `props` para o componente ScoreBoard -->
  <ScoreBoard :winCount="winCount" :loseCount="loseCount" />

  <template v-if="question">
    <!-- A API da Open Trivia retorna algumas perguntas com HTML entities, que não são convertidas quando se usa Declarative Rendering (com {{}}). Para contornar isso, podemos renderizar o texto da API usando a diretiva `v-html`, que fará essa conversão: -->
    <h1 v-html="question"></h1>
    <template v-for="answer in answers" :key="answer">
      <input :id="answer" type="radio" name="options" :value="answer" v-model="chosenAnswer"
        :disabled="answerSubmitted" />
      <label :for="answer" v-html="answer"></label><br />
    </template>
    <button class="send" type="button" @click="submitAnswer()" v-if="!answerSubmitted">
      Send
    </button>
    <section v-if="answerSubmitted" class="result">
      <h4 v-if="chosenAnswer === correctAnswer"
        v-html="`&#9989; Congratulations, the answer '${correctAnswer}' is correct.`"></h4>
      <h4 v-else v-html="`&#10060; I'm sorry, you picked the wrong answer. The correct is '${correctAnswer}'.`"></h4>
      <button class="send" type="button" @click="getNewQuestion()">Next question</button>
    </section>
  </template>
  <h4 v-else>Loading question...</h4>
</template>

<script>
import { defineComponent } from 'vue';
import ScoreBoard from './components/ScoreBoard.vue';

export default defineComponent({
  name: 'App',
  // componentes registrados para uso dentro do componente atual
  components: {
    ScoreBoard
  },
  // dados da aplicação/componente
  data() {
    return {
      question: undefined,
      incorrectAnswers: [],
      correctAnswer: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0
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
  methods: {
    submitAnswer() {
      if (!this.chosenAnswer) {
        alert('Escolha uma opção');
      } else {
        this.answerSubmitted = true;
        if (this.chosenAnswer === this.correctAnswer) {
          this.winCount++;
        } else {
          this.loseCount++;
        }
      }
    },
    getNewQuestion() {
      this.answerSubmitted = false;
      this.chosenAnswer = undefined;
      this.question = undefined;

      this.axios
        .get('https://opentdb.com/api.php?amount=1&category=18')
        .then(response => {
          this.question = response.data.results[0].question;
          this.incorrectAnswers = response.data.results[0].incorrect_answers;
          this.correctAnswer = response.data.results[0].correct_answer;
        });
    }
  },
  // Lifecycle method: pegamos os dados da API assim que o app for inicializado
  created() {
    this.getNewQuestion();
  }
});
// API_URL: https://opentdb.com/api.php?amount=1&category=18
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 32px;
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
