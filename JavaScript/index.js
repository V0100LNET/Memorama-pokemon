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
                location.replace("http://127.0.0.1:5500/pages/Play.html");
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
    
    $pokemons.innerHTML += `
        <div class="play-effect">
            <div class="play-container-pokemon show-pokemon"><img src="${json.sprites.front_default}" alt="${json.id}"></div>
            <div class="play-container-pokebola"><img src="../assets/img/pokebola.png" alt=""></div>
            <div class="play-container-center"></div>
        </div>
    `
}


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function setPokemonToDom(){
    for(numero_pokemon = 1; numero_pokemon<=8; numero_pokemon++){
        getPokemonApi(getRandomInt(100));
    }
}

AuthenticationLogin();
document.addEventListener('DOMContentLoaded', function(){
    setNamePlayer();
    setPokemonToDom();
});