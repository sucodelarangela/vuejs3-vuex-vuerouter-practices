import { defineStore } from 'pinia';
import EventService from '../services/EventService.js';

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
  },
  // Pinia não possui `mutations`, o que significa que podemos mudar o `state` diretamente com o uso de `this`
  actions: {
    fetchEvents() {
      return EventService.getEvents()
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          throw error;
        });
    },
    createEvent(event) {
      return EventService.postEvent(event)
        .then(() => {
          this.events.push(event);
        })
        .catch(error => {
          throw error;
        });
    },
    fetchEvent(id) {
      return EventService.getEvent(id)
        .then(response => {
          this.event = response.data;
        })
        .catch(error => {
          throw error;
        });
    }
  }
});
