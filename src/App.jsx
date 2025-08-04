import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import Location from './components/Location.jsx';

function App() {
  const [locations, setLocations] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/location');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.log('Something went wrong:', error);
      }
    }
    
    fetchData(url);
  }, [url]);

  function handleLoc(url) {
    setUrl(url);
  }
  
  return (
    <div id="root">
      {locations.map((location) => {
        return <Location key={location.name} name={location.name} onClick={() => handleLoc(location.url)} />
      })}
    </div>
  )
}

export default App
