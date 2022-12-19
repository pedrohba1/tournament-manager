
import React from 'react';

import './App.css';
import { handleTourneyCreation } from './utils/handleTourneyCreation';
import { Bracket } from 'react-brackets';
import { parseDataToRounds } from './utils/parseDataToRunds';
import { CustomSeed } from './components/CustomSeed';

function App() {
  const tourney = handleTourneyCreation();

  return (
    <div className="App">
      <div style={{paddingLeft: 20}}>
        <h1>Winner Bracket</h1>
        <Bracket
          rounds={parseDataToRounds(tourney.matches)}
          renderSeedComponent={CustomSeed}
          roundClassName="round"
        />
      </div>
      <div style={{width:"100%", borderBottom:"1px solid white", margin:"50px 0px"}}></div>
      <div style={{paddingLeft: 20}}>
        <h1>Loser Bracket</h1>
        <Bracket
          rounds={parseDataToRounds(tourney.matches)}
          renderSeedComponent={CustomSeed}
          roundClassName="round"
        />
      </div>
    </div>
  );
}

export default App;
