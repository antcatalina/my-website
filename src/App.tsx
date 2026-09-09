/* Imported first so the cascade-layer order in tokens.css is established
   before any component stylesheet declares a layer of its own. */
import './styles/tokens.css';
import './styles/base.css';
import Home from './components/Home';

function App() {
  return <Home />;
}

export default App;
