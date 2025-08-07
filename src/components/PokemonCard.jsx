import React from 'react'

function PokemonCard({ name }) {
    if (!data) return null;
    return (
        <>
        <article>
            <p>You encountered a(n):</p>
            <h3>{data.name}</h3>
            <img className='poke-picture' src={data.sprites.front_default} alt={data.name}></img>
        </article>
        <h2>Details:</h2>
        <div className='poke-card'>
            <div className='basics'>
            <h5>Basic Datas:</h5>
            <ul className='base-data-container'>
                <li>ID: {data.id}</li>
                <li>📏 Height: {data.height}</li>
                <li>🪶 Weight: {data.weight}</li>
                <li>🌟 Base experience: {data.base_experience}</li>
            </ul>
            </div>

            <div className='types'>
                <h5>Types:</h5>
                <ul className='type-data-container'>
                    {data.types.map((t) => (
                         <li key={t.slot}>{t.type.name}</li>
                    ))}
                </ul>
            </div>

            <div className='abilities'>
                <h5>Abilities:</h5>
                <ul>
                    {data.abilities.map((a) => (
                        <li key={a.ability.name}>
                            {a.ability.name} {a.is_hidden ? '(Hidden)' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='stats'>
                <h5>Stats:</h5>
                <ul>
                    {data.stats.map((s) => (
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

    

