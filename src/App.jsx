import React from 'react';
import './App.css'
import Location from './components/Location.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <h1>Location List</h1>
      <Location />
    </div>
  )
}

export default App
