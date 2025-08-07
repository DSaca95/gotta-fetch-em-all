import React from 'react'

function PokemonCard({ name }) {
    if (!name) return null;
    return (
        <>
        <article>
            <p>You encountered a(n):</p>
            <h3>{name.name}</h3>
            <img className='poke-picture' src={name.sprites.front_default} alt={name.name}></img>
        </article>
        <h2>Details:</h2>
        <div className='poke-card'>
            <div className='basics'>
            <h5>Basic names:</h5>
            <ul className='base-name-container'>
                <li>ID: {name.id}</li>
                <li>📏 Height: {name.height}</li>
                <li>🪶 Weight: {name.weight}</li>
                <li>🌟 Base experience: {name.base_experience}</li>
            </ul>
            </div>

            <div className='types'>
                <h5>Types:</h5>
                <ul className='type-name-container'>
                    {name.types.map((t) => (
                         <li key={t.slot}>{t.type.name}</li>
                    ))}
                </ul>
            </div>

            <div className='abilities'>
                <h5>Abilities:</h5>
                <ul>
                    {name.abilities.map((a) => (
                        <li key={a.ability.name}>
                            {a.ability.name} {a.is_hidden ? '(Hidden)' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='stats'>
                <h5>Stats:</h5>
                <ul>
                    {name.stats.map((s) => (
                        <li key={s.stat.name}>
                            {s.stat.name}: {s.base_stat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
      );
}

export default PokemonCard;

    

