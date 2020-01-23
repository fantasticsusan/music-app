import React from 'react';
import './App.css';
import Header from './Components/Header';
import SearchDB from './Components/SearchDB';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <SearchDB/>
    </div>
  );
}

export default App;
