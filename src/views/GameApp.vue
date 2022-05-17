<template>
  <main class="game-app">
    <h1>Game App</h1>
    <GameFilter @onFilter="setFilterBy" @setLImit="setLimit" @onPage="onPage" />
    <!-- <div class="pagination flex space-between">
      <button @click="onPage(-1)">{{ "<" }}</button>
      <button @click="onPage(1)">{{ ">" }}</button>
    </div> -->
    <GameList v-if="games.length" :games="games" @select="onSelect" />
  </main>
</template>

<script>
import GameList from "../components/GameList.vue";
import GameFilter from "../components/GameFilter.vue";
export default {
  components: {
    GameList,
    GameFilter,
  },
  data() {
    return {
      games: [],
    };
  },
  async created() {
    this.loadGames();
  },
  methods: {
    async loadGames() {
      await this.$store.dispatch({ type: "loadGames" });
      this.games = this.$store.getters.getGames;
    },
    async onSelect(id) {
      this.$router.push(`/game/${id}`);
    },
    setFilterBy(filterBy) {
      this.$store.commit({ type: "setFilterBy", filterBy });
      this.loadGames();
    },
    setLimit(limit) {
      this.$store.commit({ type: "setLimit", limit });
      this.loadGames();
    },
    onPage(diff) {
      this.$store.commit({ type: "setPage", diff });
      this.loadGames();
    },
  },
};
</script>

<style>
</style>