<script>
import { store } from "../data/store";
import { ref, computed } from "vue";

export default {
  setup() {
    const pokeName = ref("");
    const pokeDate = computed(() => store.pokeDate);
    const filteredList = computed(() => store.filteredList);
    const listPokemon = computed(() => store.listPokemon);

    const filterPokemon = () => {
      if (!pokeName.value.trim()) {
        store.filteredList = [];
        return;
      }
      store.filteredList = listPokemon.value.filter((pokemon) =>
        pokemon.name.includes(pokeName.value.toLowerCase())
      );
    };

    const searchPokemon = async () => {
      store.pokeDate = null;
      await filterPokemon();
    };

    const selectPokemon = async (pokemon) => {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        store.pokeDate = data;
      } catch (error) {
        console.error(error);
      }
    };

    const allPokemon = async () => {
      try {
        const response = await fetch(store.Url.base);
        const data = await response.json();
        store.listPokemon = data.results;
      } catch (error) {
        console.error(error);
      }
    };

    allPokemon();
    return {
      pokeName,
      pokeDate,
      filteredList,
      searchPokemon,
      selectPokemon,
    };
  },
};
</script>

<template>
  <input
    type="text"
    class="m-4"
    placeholder="Search Pokemon"
    v-model="pokeName"
    @keyup.enter="searchPokemon"
  />
  <div @click="searchPokemon" class="btn btn-secondary">Cerca</div>
  <div v-if="pokeDate">
    <img
      class="ps-4"
      :src="pokeDate.sprites.front_default"
      :alt="pokeDate.name"
    />
  </div>
  <div
    class="ps-4 pokemon"
    v-for="(pokemon, index) in filteredList"
    :key="index"
    @click="selectPokemon(pokemon)"
  >
    <ul>
      <li>{{ pokemon.name }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.pokemon {
  cursor: pointer;
}
</style>
