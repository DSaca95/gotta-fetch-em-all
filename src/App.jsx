import React, { useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch.js';
import Locations from './components/Locations.jsx';
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

function App() {
  const [locations, loading, error] = useFetch('https://pokeapi.co/api/v2/location');
  const [showAllLocation, setShowAllLocation] = useState(true);
  const [selectedLocationURL, setSelectedLocationURL] = useState(null);

  const setLocationURL = (url) => {
    setSelectedLocationURL(url);
    setShowAllLocation(false);
  }

  const onBack = () => {
    setSelectedLocationURL(null);
    setShowAllLocation(true);
  }

  return (
    <div className="App">
      <Header/>
        {
          showAllLocation ? <Locations data={locations} loading={loading} error={error} handleClick={setLocationURL}/>
                          : <Location url={selectedLocationURL} onBack={onBack}/>
        }
        
      <Footer />
    </div>
  )
}

export default App
