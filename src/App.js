import './App.css';
import { Header, GameArea } from './ui-components';
import { GlobalsProvider } from './Globals';

function App() {

  return (
    <GlobalsProvider>
      <div>
        <Header />
        <GameArea />
      </div>
    </GlobalsProvider>
  );
}

export default App;
