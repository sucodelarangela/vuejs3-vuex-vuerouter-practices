<template>
  <section class="score">
    Player <span>{{ winCount }}</span> x <span>{{ loseCount }}</span> Computer
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  // recebendo props do componente pai
  props: ['winCount', 'loseCount']
});
</script>

<style lang="scss" scoped>
section.score {
  border-bottom: 1px solid black;
  padding: 24px;
  font-size: 18px;

  span {
    padding: 8px;
    font-weight: bold;
    border: 1px solid black;
  }
}
</style>
