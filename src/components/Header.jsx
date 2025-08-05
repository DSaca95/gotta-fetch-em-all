import React from "react";
import "../styles/Header.css";

function Header() {
    return (
        <header>
            <div className="logo-container"><a href="#"></a></div>
            <div className="button-container">
            <button className="location-list">Locations 🗺️</button>
            <button className="my-pokemons">My Pokemons 🦖🦖🦖</button>
            </div>
        </header>
    )
}

export default Header;