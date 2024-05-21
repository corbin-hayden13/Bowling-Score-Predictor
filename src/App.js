import logo from './logo.svg';
import './App.css';
import { Game } from './score-logic';
import Player from "./Player.js";
import { Header, TableRow } from './ui-components';
import { GlobalsProvider } from './Globals';

function App() {

  let rowData = {
    player: new Player(0, "Test Player")
  };

  rowData.player.game.setFrame(0, [7,3]);

  return (
    <GlobalsProvider>
      <div>
        <Header />
        <TableRow {...rowData}/>
      </div>
    </GlobalsProvider>
  );
}

export default App;
