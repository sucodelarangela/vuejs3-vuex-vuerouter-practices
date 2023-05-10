<template>
  <!-- A `navbar`, por estar fora do `router-view`, será mostrada em todas as páginas -->
  <div id="nav">
    <!-- O `router-link` cria âncoras para navegação entre páginas -->
    <router-link to="/">Início </router-link> -
    <router-link to="/basket">Carrinho (0)</router-link>
  </div>
  <!-- Todos os componentes roteados serão renderizados dentro do `router-view` -->
  <router-view />
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    // `dispatch()` é usado para invocar `actions` da `store`
    this.$store.dispatch('loadProducts');
  }
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 80px auto;
}

#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgb(37, 37, 37);
  color: white;


  a {
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #007bff;
    }
  }
}
</style>
