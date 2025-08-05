import React from 'react';
import './App.css'
import Location from './components/Location.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <Location />
      <Footer />
    </div>
  )
}

export default App
