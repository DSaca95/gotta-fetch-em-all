import React from "react";
import "../styles/Header.css";

function Header({onClickPokePageBtn, onClickLocationsPageBtn}) {
    return (
        <header>
            <div className="logo-container"><a href="#"></a></div>
            <div className="button-container">
            <button onClick={onClickLocationsPageBtn} className="location-list">Locations 🗺️</button>
            <button onClick={onClickPokePageBtn} className="my-pokemons">My Pokemons 🦖🦖🦖</button>
            </div>
        </header>
    )
}

export default Header;