import React from "react";
import useFetch from "../hooks/useFetch";
import "../styles/MyPokemon.css";
import PokemonCard from "./PokemonCard";

function PokemonDisplay({ name }) {
    const [pokemon] = useFetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!pokemon) {
        return <div>Loading {name}...</div>;
    }

    return (
        <div className="pokemon-container">
            <article>
                <p>You own:</p>
                <h3>{pokemon.name}</h3>
                <img className='poke-picture' src={pokemon.sprites.front_default} alt={pokemon.name}></img>
            </article>
            <h2>Details:</h2>
            <div className='poke-card'>
                <div className='basics'>
                    <h5>Basic Datas:</h5>
                    <ul className='base-data-container'>
                        <li>ID: {pokemon.id}</li>
                        <li>📏 Height: {pokemon.height}</li>
                        <li>🪶 Weight: {pokemon.weight}</li>
                        <li>🌟 Base experience: {pokemon.base_experience}</li>
                    </ul>
                </div>

                <div className='types'>
                    <h5>Types:</h5>
                    <ul className='type-data-container'>
                        {pokemon.types.map((t) => (
                            <li key={t.slot}>{t.type.name}</li>
                        ))}
                    </ul>
                </div>

                <div className='abilities'>
                    <h5>Abilities:</h5>
                    <ul>
                        {pokemon.abilities.map((a) => (
                            <li key={a.ability.name}>
                                {a.ability.name} {a.is_hidden ? '(Hidden)' : ''}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='stats'>
                    <h5>Stats:</h5>
                    <ul>
                        {pokemon.stats.map((s) => (
                            <li key={s.stat.name}>
                                {s.stat.name}: {s.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function MyPokemon({ ownedPokemons }) {
    if (!ownedPokemons || ownedPokemons.length === 0) {
        return (
            <div>
                <h2>My Pokémon</h2>
                <p>You don't own any Pokémon yet!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>My Pokémon ({ownedPokemons.length})</h2>
            {ownedPokemons.map((pokemonName, index) => (
                <PokemonDisplay key={`${pokemonName}-${index}`} name={pokemonName} />
            ))}
        </div>
    )
}