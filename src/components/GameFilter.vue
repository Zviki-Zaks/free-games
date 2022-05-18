<template>
  <section class="game-filter flex space-between">
    <input
      type="text"
      v-model="filterBy.title"
      @input="$emit('onFilter', { ...filterBy })"
      placeholder="Search by name"
    />
    <input
      type="text"
      v-model="filterBy.genre"
      @input="$emit('onFilter', { ...filterBy })"
      placeholder="Search by category"
    />
    <div class="pagination flex">
      <select v-model="limit" @change="$emit('setLImit', limit)">
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <button @click="$emit('onPage', -1)">{{ "<" }}</button>
      <button @click="$emit('onPage', 1)">{{ ">" }}</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        title: "",
        genre: "",
      },
      limit: 15,
    };
  },
  methods: {},
};
</script>
