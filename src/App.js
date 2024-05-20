import logo from './logo.svg';
import './App.css';
import { Game } from './score-logic';

function App() {
  let tempGame = new Game();
  tempGame.setFrame(1, [3, 7]);
  tempGame.setFrame(5, [0, 7]);

  console.log(`Test max score ${tempGame.maxScore()}`);
  console.log(`Test current score ${tempGame.currScore()}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
