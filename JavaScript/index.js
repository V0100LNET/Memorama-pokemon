function AuthenticationLogin(){
    const $input_name = document.getElementById("name");
    const $set_class_error = document.querySelector(".error");
    const $container_home = document.querySelector(".container-home");
    const $set_loader = document.querySelector(".sk-cube-grid");
    
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if($input_name.value === ""){
            $set_class_error.classList.remove("d-none");
            $input_name.className = "error-input";

            setTimeout(() => {
                $set_class_error.classList.add("d-none");
                $input_name.classList.remove("error-input");
            },3000);

            return;
        }

        if($input_name.value.length > 0){
            localStorage.setItem('name_player', $input_name.value);
            $container_home.classList.add("d-none");
            $set_loader.classList.remove("d-none");

            setTimeout(() => {
                $set_loader.classList.add("d-none");
                location.replace("https://v0100lnet.github.io/Memorama-pokemon/pages/Play.html");
            },2000);
        }
    });
}

function setNamePlayer(){
    const $name_player = document.getElementById("name-player");
    $name_player.innerHTML = `¡Hola <span>${localStorage.getItem('name_player')}</span> a jugar!`;
}

async function getPokemonApi(number_pokemon){
    let $pokemons = document.getElementById("pokemons");
    let url = `https://pokeapi.co/api/v2/pokemon/${number_pokemon}`;
    let response = await fetch(url);
    let json = await response.json();
    let img_pokemon = json.sprites.front_default;
    let id_pokemon = json.id;

    $pokemons.innerHTML += `
        <div class="play-effect toggle-animation hidden-pokemon">
            <div class="play-container-pokemon"><img id="img_pokemon" src="${img_pokemon}" alt="" data-id="${id_pokemon}"></div>
            <div class="play-container-pokebola"><img src="../assets/img/pokebola.png" alt=""></div>
            <div class="play-container-center"></div>
        </div>
    `
    clonePokemons(img_pokemon, id_pokemon);
    setAnimationToDoClick();
}


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function clonePokemons(img_pokemon, id_pokemon){
    console.log(img_pokemon,id_pokemon);
    let $pokemons = document.getElementById("pokemons");
    
    $pokemons.innerHTML += `
        <div class="play-effect toggle-animation">
            <div class="play-container-pokemon"><img id="img_pokemon" src="${img_pokemon}" alt="" data-id="${id_pokemon}"></div>
            <div class="play-container-pokebola"><img src="../assets/img/pokebola.png" alt=""></div>
            <div class="play-container-center"></div>
        </div>
    `
}

function setPokemonToDom(){
    const number_of_pokemons = 10;

    for(numero_pokemon = 1; numero_pokemon<=number_of_pokemons; numero_pokemon++){
        getPokemonApi(getRandomInt(100));
    }
}

function setAnimationToDoClick(){
    const $toggle_animation = document.querySelectorAll(".toggle-animation");

    $toggle_animation.forEach((container_pokemon) => {
        const $pokemon = container_pokemon.querySelector(".play-container-pokemon");
        const  $pokemon_id = container_pokemon.querySelector(".play-container-pokemon > img").getAttribute("data-id");

        container_pokemon.addEventListener("click", (e) => {
            $pokemon.classList.add("show-pokemon");
            comparePokemonId(parseInt($pokemon_id));
        });
    });
};

function comparePokemonId($pokemon_id){
    if($pokemon_id === parseInt(localStorage.getItem("pokemon_id"))){
        disablePokemon();
    }
    localStorage.setItem("pokemon_id", $pokemon_id);
}

function disablePokemon() {
    const $pokemon = document.querySelector(".play-container-pokebola");
    const $img_pokemon = document.querySelector(".play-container-pokemon > img");
    $pokemon.classList.add("hidden-pokemon");
    $img_pokemon.classList.add("hidden-pokemon");
}

function enablePokemon(){

}


AuthenticationLogin();
document.addEventListener('DOMContentLoaded', function(){
    setNamePlayer();
    setPokemonToDom();
});