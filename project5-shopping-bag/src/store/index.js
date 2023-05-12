import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  // `state` sãos os dados/estados globais da aplicação
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    // o nome igual à action não gera conflito
    // Sintaxe: nomeDaMutation(estadoAAlterar, novosDados){ações}
    loadProducts(state, products) {
      state.products = products;
    },
    loadBag(state, products) {
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },
    removeFromBag(state, productId) {
      let updatedBag = state.productsInBag.filter(item => item.id !== productId);
      state.productsInBag = updatedBag;
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }
  },
  // os `states` não podem ser mudados por atribuição direta, portanto, precisamos definir `actions` para lidar com as mudanças de valores. Porém, quem realmente faz a mudança dos `states` são as `mutations`, que devem ser invocadas dentro de uma `action` através de `this.commit()`
  // `actions` podem ser assíncronas. `mutations` são sempre síncronas.
  actions: {
    loadProducts({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data);
        });
    },
    loadBag({ commit }) {
      if (localStorage.getItem('productsInBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
      }
    },
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    removeFromBag({ commit }, productId) {
      commit('removeFromBag', productId);
    }
  },
  modules: {
  }
});
