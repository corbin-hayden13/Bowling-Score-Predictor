import logo from './logo.svg';
import './App.css';
import { Game } from './score-logic';
import Player from "./Player.js";
import { Header, TableRow } from './ui-components';
import { GlobalsProvider } from './Globals';

function App() {

  const rowData = {
    player: new Player(0, "Test Player")
  };

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
