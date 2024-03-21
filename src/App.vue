<script>
import SearchPokemon from "./components/SearchPokemon.vue";
import { store } from "./data/store";
export default {
  store,
  components: { SearchPokemon },
};
</script>
<template>
  <search-pokemon></search-pokemon>
</template>

<style lang="scss" scoped></style>
