<script>
import { store } from "../data/store";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const pokeName = ref("");

    const filterPokemon = () => {
      if (!pokeName.value.trim()) {
        store.filteredList = [];
        return;
      }
      store.filteredList = store.listPokemon.filter((pokemon) =>
        pokemon.name.includes(pokeName.value.toLowerCase())
      );
    };

    const searchPokemon = async () => {
      store.pokeDate = null;
      filterPokemon();
    };

    const selectPokemon = async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      store.pokeDate = data;
    };

    onMounted(async () => {
      const response = await fetch(store.Url.base);
      store.listPokemon = (await response.json()).results;
    });

    return {
      pokeName,
      pokeDate: computed(() => store.pokeDate),
      filteredList: computed(() => store.filteredList),
      searchPokemon,
      selectPokemon,
    };
  },
};
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center pt-5">
    <div class="pokedex shadow row">
      <div class="col-6">
        <input
          type="text"
          class="m-4"
          placeholder="Cerca Pokemon"
          v-model="pokeName"
          @keyup.enter="searchPokemon"
        />
        <div @click="searchPokemon" class="btn btn-secondary">Cerca</div>
        <div class="content-name">
          <div
            class="ps-4 pokemon"
            v-for="(pokemon, index) in filteredList"
            :key="index"
            @click="selectPokemon(pokemon)"
          >
            <div>{{ pokemon.name }}</div>
          </div>
        </div>
      </div>
      <div class="col-6 right-content">
        <div v-if="pokeDate">
          <img
            class="ps-4"
            :src="pokeDate.sprites.front_default"
            :alt="pokeDate.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokedex {
  background-color: #c20f0f;
  border: 15px solid #7f0202;
  border-radius: 3px;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.right-content {
  border-left: 7.5px solid #7f0202;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 200px;
  }
}
.content-name {
  overflow-y: auto;
  max-height: 480px;
}

.pokemon {
  cursor: pointer;
}
</style>
