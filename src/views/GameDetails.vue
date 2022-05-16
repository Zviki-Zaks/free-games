<template>
  <section v-if="game" class="game-details">
    <h2>{{ game.title }}</h2>
    <img :src="game.thumbnail" alt="" />
    <p>{{ game.short_description }}</p>
    <p>{{ game.publisher }}</p>
    <p>{{ game.genre }}</p>
    <p>{{ game.game_url }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      game: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    console.log("id", id);
    await this.$store.dispatch({ type: "loadGame", gameId: +id });
    // const game = await this.$store.dispatch({ type: "loadGame", gameId: id });
    this.game = this.$store.getters.getGame;
    console.log("this.game", this.game);
  },
};
</script>

<style>
</style>