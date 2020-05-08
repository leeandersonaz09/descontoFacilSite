import React from 'react';

import './App.css';

import logo from './assets/Desconto facil logo.svg';

import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img style={{width:180, height:180}} src={logo} alt="Desconto Fácil" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
