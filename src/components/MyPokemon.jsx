import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../styles/MyPokemon.css";

export default function MyPokemon({ ownedPokemons }) {
    const [selectedPokemonURL, setSelectedPokemonURL] = useState(null);
    const [pokemon] = useFetch(selectedPokemonURL);

    function handleClick(name) {
        setSelectedPokemonURL(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }

    return (
        <div id="pokemon-page">
            <h2>My Pokemon ({ownedPokemons.length})</h2>
            
            <ul>
                {ownedPokemons.map((name) => (
                    <li key={name}>
                        <strong>{name}</strong>
                        <div>
                            <button onClick={() => handleClick(name)}>Details</button>
                        </div>
                    </li>
                ))}
            </ul>
            
            {pokemon && (
                <div className="pokemon-details">
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p><span>HP:</span><span>{pokemon.stats[0].base_stat}</span></p>
                    <p><span>Attack:</span><span>{pokemon.stats[1].base_stat}</span></p>
                    <p><span>Defense:</span><span>{pokemon.stats[2].base_stat}</span></p>
                </div>
            )}
        </div>
    )
}