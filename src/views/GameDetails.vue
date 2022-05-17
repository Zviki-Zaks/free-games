<template>
  <section v-if="game" class="game-details">
    <h2>{{ game.title }}</h2>
    <img :src="game.thumbnail" alt="" />
    <p class="description">
      Description:
      <span>{{ isMore ? game.description : game.short_description }}</span>
      <button @click="isMore = !isMore">
        {{ isMore ? "less" : "more..." }}
      </button>
    </p>
    <p>
      Publisher: <span>{{ game.publisher }}</span>
    </p>
    <p>
      Genre: <span>{{ game.genre }}</span>
    </p>
    <nav class="flex space-around">
      <a :href="game.game_url">Let's play</a>
      <router-link to="/">Back</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      game: null,
      isMore: false,
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