const pokemonName = document.querySelector(".namePokemon");

const pokemonID = document.querySelector(".numberPokemon");

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
}

renderPokemon('6');