import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function Area({url}) {
    const [areaPokemons, loading, error] = useFetch(url);
    const [encounterURL, setEncounterURL] = useState(null);
    const [encounter] = useFetch(encounterURL);

    useEffect(() => {
        if (areaPokemons) {
            const encounters = areaPokemons.pokemon_encounters;
            if (encounters && encounters.length > 0) {
                const randomIndex = Math.floor(Math.random() * encounters.length);
                setEncounterURL(encounters[randomIndex].pokemon.url);
            }
        }
    }, [areaPokemons]);

    useEffect(() => {
        if (encounter) {
            console.log(encounter);
        }
    }, [encounter]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div><p>{encounterURL}</p></div>
    )
}