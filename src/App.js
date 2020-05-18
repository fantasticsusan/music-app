import React from 'react'
import './Style/App.scss'
import {Header, Footer} from './Components'
import {Layout} from './Pages'

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
