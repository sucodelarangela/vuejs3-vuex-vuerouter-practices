import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
  // Para declarar um estado, usamos uma função `state()` que retorna os valores deles. Essa função também pode ser escrita como `arrow function`(vide EventStore para exemplo sem `arrow function`)
  state: () => ({
    user: 'Angela Caldas'
  }),
  // Definimos getters usando `function definition`, assim o Pinia já disponibiliza os estados para os `getters` com o uso da palavra-chave `this`. Também é possível usar `arrow function` (vide EventStore para exemplo).
  // No entanto, caso seja necessário definir mais de um `getter`, é recomendado não usar `arrow functions`, pois a palavra-chave `this` pode nosa dar contexto fora do estado
  getters: {
    firstName() {
      return this.user.split(' ')[0];
    }
  }
});
