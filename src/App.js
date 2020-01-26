import React from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
