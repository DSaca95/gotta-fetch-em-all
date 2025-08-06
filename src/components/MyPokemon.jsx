import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function MyPokemon() {
    const userPokemons = {
        bulbasaur: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        charizard: "https://pokeapi.co/api/v2/pokemon/charizard",
        poliwhirl: "https://pokeapi.co/api/v2/pokemon/poliwhirl"
    }
    const pokeNames = Object.keys(userPokemons);

    const [activePokemonURL, setActivePokemonURL] = useState(null);
    const [pokemon] = useFetch(activePokemonURL);

    function handleClick(url) {
        setActivePokemonURL(url);
    }

    return (
        <div id="pokemon-page">
            <ul>
                {pokeNames.map((name) => (
                    <li onClick={() => handleClick(name)} key={name}>{name}</li>
                ))}
            </ul>
        </div>
    )
}