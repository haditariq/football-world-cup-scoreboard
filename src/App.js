import './App.css';
import Heading from './components/Heading';
import ScoreBoard from './pages/ScoreBoard';

function App() {
  return (
    <div className='App'>
      <Heading/>
      Scoreboard displayes
      <ScoreBoard />
    </div>
  );
}

export default App;
