<script>
import EventCard from '../components/EventCard.vue';
// importando EventStore
import { useEventStore } from '../stores/EventStore';

export default {
  components: {
    EventCard
  },
  // usando os dados do estado de EventStore
  setup() {
    const eventStore = useEventStore();
    return { eventStore };
  },
  // mudando `$store` por `eventStore` para usarmos a `action` do Pinia, e não do Vuex
  // também não precisamos de `dispatch`, então `.dispatch('fetchEvents')` vira `.fetchEvents()`
  created() {
    this.eventStore.fetchEvents().catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      });
    });
  },
  // Buscando do Pinia, podemos simplesmente declarar essa `computed` diretamente dentro do `<template>`
  // computed: {
  //   events() {
  //     return this.$store.state.events;
  //   }
  // }
};
</script>

<template>
  <!-- Buscando número de eventos diretamente do store com Pinia -->
  <h1>{{ eventStore.numberOfEvents }} Events for Good</h1>
  <div class="events">
    <!-- Buscando events do eventStore -->
    <EventCard v-for="event in eventStore.events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
