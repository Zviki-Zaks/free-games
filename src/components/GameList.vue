<template>
  <section class="game-list">
    <GamePreview
      v-for="game in games"
      :key="game.id"
      :game="game"
      @click="$emit('select', game.id)"
    />
  </section>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  props: {
    games: Array,
  },
  components: { GamePreview },
};
</script>

<style>
</style>