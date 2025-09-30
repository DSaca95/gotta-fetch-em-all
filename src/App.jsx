import React, { useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch.js';
import Locations from './components/Locations.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Area from './components/Area.jsx';
import MyPokemon from './components/MyPokemon.jsx'

function App() {
  const [locations, loading, error] = useFetch('https://pokeapi.co/api/v2/location');
  const [selectedLocationURL, setSelectedLocationURL] = useState(null);
  const [selectedAreaURL, setSelectedAreaURL] = useState(null);
  const [ownedPokemons, setOwnedPokemons] = useState(['skeledirge', 'charizard', 'poliwhirl', 'arceus']);

  const [currentPage, setCurrentPage] = useState('locationsPage');

  const addPokemon = (pokemonName) => {
    if (!ownedPokemons.includes(pokemonName)) {
      setOwnedPokemons(prev => [...prev, pokemonName]);
    }
  };

  const Pages = {
    locationsPage: <Locations data={locations} loading={loading} error={error} handleClick={handleGoToLocationBtn}/>,
    myPokePage: <MyPokemon ownedPokemons={ownedPokemons} />,
    locationPage: <Location url={selectedLocationURL} onBack={onBack} handleAreaBtn={handleAreaBtn}/>,
    areaPage: <Area url={selectedAreaURL} onBack={onBack} addPokemon={addPokemon} ownedPokemons={ownedPokemons}/>
  }

  function handleGoToLocationBtn(url) {
    setSelectedLocationURL(url);
    setCurrentPage('locationPage');
  }

  function onBack(page) {
    setCurrentPage(page)
  }

  function handleAreaBtn(url) {
    setSelectedAreaURL(url);
    setCurrentPage('areaPage');
  }

  function handleMyPokeBtn() {
    setCurrentPage('myPokePage');
  }

  function handleLocationsBtn() {
    setCurrentPage('locationsPage');
  }

  return (
    <div className="App">
      <Header onClickPokePageBtn={handleMyPokeBtn} onClickLocationsPageBtn={handleLocationsBtn}/>
        {
          Pages[currentPage]
        }
      <Footer />
    </div>
  )
}

export default App
