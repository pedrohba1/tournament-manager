
import React from 'react';

import logo from './logo.svg';

import './App.css';
import { handleTourneyCreation } from './utils/handleTourneyCreation';
import { Bracket } from 'react-brackets';
import { parseDataToRounds } from './utils/parseDataToRunds';

function App() {

  const tourney = handleTourneyCreation();


  return (
    <div className="App">
      <Bracket
        rounds={parseDataToRounds(tourney.matches)}
      ></Bracket>
    </div>
  );
}

export default App;
