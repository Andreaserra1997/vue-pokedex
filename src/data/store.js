import { reactive } from "vue";

export const store = reactive({
  Url: {
    base: "https://pokeapi.co/api/v2/pokemon?limit=100",
  },
  pokeName: "",
  pokeDate: null,
  allPokemon: [],
  filteredList: [],
});
