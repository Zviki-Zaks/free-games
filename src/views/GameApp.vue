<template>
  <main class="game-app">
    <h1>Game App</h1>
    <GameList v-if="games.length" :games="games" @select="onSelect" />
  </main>
</template>

<script>
import GameList from "../components/GameList.vue";
export default {
  components: {
    GameList,
  },
  data() {
    return {
      games: [],
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadGames" });
    this.games = this.$store.getters.getGames;
  },
  methods: {
    async onSelect(id) {
      console.log("id", id);
      this.$router.push(`/game/${id}`);
      // await this.$store.dispatch({ type: "loadGame", gameId: id });
      // // const game = await this.$store.dispatch({ type: "loadGame", gameId: id });
      // console.log("game", game);
    },
  },
};
</script>

<style>
</style>