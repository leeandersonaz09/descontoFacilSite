import React from 'react';

import './App.css';

import logo from './assets/c-logo.svg';

import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Desconto Fácil" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
