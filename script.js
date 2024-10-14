const url = "https://pokeapi-proxy.freecodecamp.rocks";
const endpoint = "/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const outputDiv = document.getElementById("output");
const pokemonImage = document.getElementById("sprite");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypesDiv = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const fetchData = async (query) => {
  try {
    const response = await fetch(`${url}${endpoint}/${query}`);
    if (!response.ok) throw new Error(`Pokémon not found`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renderData = (data) => {
  pokemonImage.src = data.sprites.front_default;
  pokemonImage.alt = `${data.name} image`;

  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  pokemonWeight.textContent = `Weight: ${data.weight}`;
  pokemonHeight.textContent = `Height: ${data.height}`;

  pokemonTypesDiv.innerHTML = "";
  data.types.forEach((type) => {
    pokemonTypesDiv.innerHTML += `<span class="type ${
      type.type.name
    }">${type.type.name.toUpperCase()}</span>`;
  });

  const stats = data.stats;
  pokemonHp.textContent = `${stats[0].base_stat}`;
  pokemonAttack.textContent = `${stats[1].base_stat}`;
  pokemonDefense.textContent = `${stats[2].base_stat}`;
  pokemonSpecialAttack.textContent = `${stats[3].base_stat}`;
  pokemonSpecialDefense.textContent = `${stats[4].base_stat}`;
  pokemonSpeed.textContent = `${stats[5].base_stat}`;

  outputDiv.style.display = "flex";
};

const searchPokemon = async () => {
  const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, "-");
  const data = await fetchData(query);

  if (!data) {
    alert("Pokémon not found");
    return;
  }

  renderData(data);
};

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchPokemon();
});

searchButton.addEventListener("click", () => {
  searchPokemon();
});
