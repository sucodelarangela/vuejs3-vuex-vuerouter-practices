import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  // `state` sãos os dados/estados globais da aplicação
  state: {
    products: []
  },
  mutations: {
    // o nome igual à action não gera conflito
    // Sintaxe: nomeDaMutation(estadoAAlterar, novosDados){ações}
    loadProducts(state, products) {
      state.products = products;
    }
  },
  // os `states` não podem ser mudados por atribuição direta, portanto, precisamos definir `actions` para lidar com as mudanças de valores. Porém, quem realmente faz a mudança dos `states` são as `mutations`, que devem ser invocadas dentro de uma `action` através de `this.commit()`
  // `actions` podem ser assíncronas. `mutations` são sempre síncronas.
  actions: {
    loadProducts() {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          this.commit('loadProducts', response.data);
        });
    }
  },
  modules: {
  }
});
