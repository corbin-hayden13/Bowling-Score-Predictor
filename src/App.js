import logo from './logo.svg';
import './App.css';
import { Game } from './score-logic';
import { Header, GameTable } from './ui-components';

function App() {

  return (
    <div>
      <Header />
      <GameTable />
    </div>
  );
}

export default App;
