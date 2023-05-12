import { defineStore } from 'pinia';

// Criando uma `store`: `defineStore('nome-da-store', {configs})
export const useEventStore = defineStore('EventStore', {
  state() {
    return {
      events: [],
      event: {}
    };
  },
  getters: {
    numberOfEvents: state => state.events.length
  }
});
