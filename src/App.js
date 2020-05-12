import React from 'react';
import './App.css';
import Header from './Components/Header/index'
import Layout from './Components/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header/>
      <Layout/>
      <Footer/>
    </div>
  );
}

export default App;
