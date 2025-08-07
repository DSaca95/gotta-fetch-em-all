import { useState, useEffect, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import "../styles/Area.css";

export default function Area({url, onBack, addPokemon, ownedPokemons}) {
    const [areaPokemons, loading, error] = useFetch(url);
    const [encounterURL, setEncounterURL] = useState(null);
    const [encounter] = useFetch(encounterURL);
    
    const [playerPokemons, setPlayerPokemons] = useState([]);
    const [selectedPlayerPokemon, setSelectedPlayerPokemon] = useState(null);
    const [gameState, setGameState] = useState('loading');
    const [playerHP, setPlayerHP] = useState(0);
    const [enemyHP, setEnemyHP] = useState(0);
    const [maxPlayerHP, setMaxPlayerHP] = useState(0);
    const [maxEnemyHP, setMaxEnemyHP] = useState(0);
    const [battleLog, setBattleLog] = useState([]);
    const [isAttacking, setIsAttacking] = useState(false);
    const [enemyAttackTimeout, setEnemyAttackTimeout] = useState(null);

    useEffect(() => {
        const loadPlayerPokemons = async () => {
            const pokemons = [];
            for (const pokemonName of ownedPokemons) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                pokemons.push(data);
            }
            setPlayerPokemons(pokemons);
        };
        loadPlayerPokemons();
    }, [ownedPokemons]);

    useEffect(() => {
        if (areaPokemons) {
            const encounters = areaPokemons.pokemon_encounters;
            if (encounters && encounters.length > 0) {
                const randomIndex = Math.floor(Math.random() * encounters.length);
                setEncounterURL(encounters[randomIndex].pokemon.url);
            } else {
                setGameState('no_pokemon');
            }
        }
    }, [areaPokemons]);

    const selectPokemon = useCallback((pokemon) => {
        setSelectedPlayerPokemon(pokemon);
        const playerMaxHP = pokemon.stats[0].base_stat;
        const enemyMaxHP = encounter.stats[0].base_stat;
        setPlayerHP(playerMaxHP);
        setEnemyHP(enemyMaxHP);
        setMaxPlayerHP(playerMaxHP);
        setMaxEnemyHP(enemyMaxHP);
        setGameState('battle');
        setIsAttacking(false);
        setBattleLog([`${pokemon.name} vs ${encounter.name} - Battle begins!`]);
    }, [encounter]);

    useEffect(() => {
        if (encounter && playerPokemons.length > 0) {
            setGameState('select_pokemon');
        }
    }, [encounter, playerPokemons]);

    const calculateDamage = (attacker, defender) => {
        const B = attacker.stats[1].base_stat;
        const D = defender.stats[2].base_stat;
        const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        
        const damage = Math.floor(((((2/5+2)*B*60/D)/50)+2)*Z/255);
        return damage;
    };

    const attack = () => {
        if (isAttacking || gameState !== 'battle') return;
        
        if (enemyAttackTimeout) {
            clearTimeout(enemyAttackTimeout);
            setEnemyAttackTimeout(null);
        }
        
        setIsAttacking(true);
        const damage = calculateDamage(selectedPlayerPokemon, encounter);
        const newEnemyHP = Math.max(0, enemyHP - damage);
        setEnemyHP(newEnemyHP);
        setBattleLog(prev => [...prev, `${selectedPlayerPokemon.name} dealt ${damage} damage!`]);

        if (newEnemyHP <= 0) {
            setBattleLog(prev => [...prev, `${encounter.name} defeated! You caught it!`]);
            addPokemon(encounter.name);
            setGameState('victory');
            setIsAttacking(false);
            return;
        }

        const timeout = setTimeout(() => {
            if (gameState !== 'battle') {
                setIsAttacking(false);
                return;
            }
            
            const enemyDamage = calculateDamage(encounter, selectedPlayerPokemon);
            const newPlayerHP = Math.max(0, playerHP - enemyDamage);
            setPlayerHP(newPlayerHP);
            setBattleLog(prev => [...prev, `${encounter.name} dealt ${enemyDamage} damage!`]);

            if (newPlayerHP <= 0) {
                setBattleLog(prev => [...prev, `${selectedPlayerPokemon.name} defeated! You lost!`]);
                setGameState('defeat');
            }
            setIsAttacking(false);
            setEnemyAttackTimeout(null);
        }, 1000);
        
        setEnemyAttackTimeout(timeout);
    };

    useEffect(() => {
        if (gameState === 'victory' || gameState === 'defeat') {
            const timer = setTimeout(() => {
                onBack('locationsPage');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [gameState, onBack]);

    useEffect(() => {
        return () => {
            if (enemyAttackTimeout) {
                clearTimeout(enemyAttackTimeout);
            }
        };
    }, [enemyAttackTimeout]);

    useEffect(() => {
        if (gameState !== 'battle' && enemyAttackTimeout) {
            clearTimeout(enemyAttackTimeout);
            setEnemyAttackTimeout(null);
        }
    }, [gameState, enemyAttackTimeout]);

    if (loading) return <p className="area-loading">Loading...</p>
    if (error) return <p className="area-error">Error: {error}</p>

    if (gameState === 'no_pokemon') {
        return (
            <div className="area-no-pokemon">
                <p>This location doesn't seem to have any pokemon.</p>
                <button className="area-back-button" onClick={() => onBack('locationsPage')}>Back to locations</button>
            </div>
        );
    }

    if (gameState === 'select_pokemon' && encounter) {
        return (
            <div className="pokemon-selection">
                <h2>Wild {encounter.name} appeared!</h2>
                <img src={encounter.sprites.front_default} alt={encounter.name} />
                
                <h3>Choose a pokemon for battle:</h3>
                <div className="pokemon-selection-list">
                    {playerPokemons.map((pokemon, index) => (
                        <div key={index} className="pokemon-selection-card">
                            <h4>{pokemon.name}</h4>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <p>HP: {pokemon.stats[0].base_stat}</p>
                            <p>Attack: {pokemon.stats[1].base_stat}</p>
                            <p>Defense: {pokemon.stats[2].base_stat}</p>
                            <button className="pokemon-select-button" onClick={() => selectPokemon(pokemon)}>Select</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (gameState === 'battle') {
        return (
            <div className="battle-container">
                <h2>Battle in Progress</h2>
                
                <div className="battle-arena">
                    <div className="battle-pokemon">
                        <h3>{selectedPlayerPokemon.name}</h3>
                        <img src={selectedPlayerPokemon.sprites.front_default} alt={selectedPlayerPokemon.name} />
                        <p>HP: {playerHP}/{maxPlayerHP}</p>
                    </div>
                    
                    <div className="battle-log">
                    <h4>Battle Log:</h4>
                        <ul>
                            {battleLog.map((log, index) => (
                                <li key={index}>{log}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="battle-pokemon">
                        <h3>{encounter.name}</h3>
                        <img src={encounter.sprites.front_default} alt={encounter.name} />
                        <p>HP: {enemyHP}/{maxEnemyHP}</p>
                    </div>
                </div>
                
                <button 
                    onClick={attack} 
                    disabled={isAttacking}
                    className="attack-button"
                >
                    {isAttacking ? 'Attacking...' : 'Attack'}
                </button>
            </div>
        );
    }

    if (gameState === 'victory') {
        return (
            <div className="result-container victory-container">
                <h2>Victory!</h2>
                <p>You caught {encounter.name}!</p>
                <img src={encounter.sprites.front_default} alt={encounter.name} />
                <p className="return-timer">Returning to locations in 3 seconds...</p>
                <button className="return-button" onClick={() => onBack('locationPage')}>Back to locations now</button>
            </div>
        );
    }

    if (gameState === 'defeat') {
        return (
            <div className="result-container defeat-container">
                <h2>Defeat!</h2>
                <p>{selectedPlayerPokemon.name} was defeated!</p>
                <p className="return-timer">Returning to locations in 3 seconds...</p>
                <button className="return-button" onClick={() => onBack('locationPage')}>Back to locations now</button>
            </div>
        );
    }

    return <div className="loading-encounter">Loading encounter...</div>;
}