<template>
  <section class="game-preview">
    <h2>{{ game.title }}</h2>
    <!-- <pre>{{ game }}</pre> -->
  </section>
</template>

<script>
export default {
  props: {
    game: Object,
  },
};
</script>

<style>
</style>