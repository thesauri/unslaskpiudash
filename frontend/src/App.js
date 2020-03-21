import React, { useState } from 'react';
import './App.css';
import EnterName from "./EnterName";
import Game from "./Game";
import api from './api';

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        { name !== "" ?
          <Game name={name} /> :
          <EnterName onJoin={(newName) => {
            setName(newName);
            api.setName(newName);
          }} />
      }
      </header>
    </div>
  );
}

export default App;
