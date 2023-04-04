const pokemonName = document.querySelector(".namePokemon");
const pokemonID = document.querySelector(".numberPokemon");
let pokemonImage = document.querySelector(".imagePokemon");
const formulario = document.querySelector(".form");
const input = document.querySelector(".inputSearch");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 0;
pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif";

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }

    
}

const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = 'Loading ...';
    pokemonID.innerHTML = '';


    if (data){
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
        if(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] == null){
            pokemonImage.style.display = 'none';
            pokemonName.innerHTML = 'Pokemon not found';
            pokemonName.style.fontSize ='86%';
            pokemonID.innerHTML= '';
            input.value = '';
        }

    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonID.innerHTML = '';
        input.value = '';
    }

}

formulario.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click',  () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);

});

// renderPokemon(25);