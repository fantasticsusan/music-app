import React from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="app">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
