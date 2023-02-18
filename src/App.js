import './App.css';
import Heading from './components/Heading';
import ScoreBoard from './pages/ScoreBoard';

function App() {
  return (
    <div className='App'>
        <Heading
          title={'Live Football World Cup Scoreboard'}
          fontWeight={'bold'}
          fontSize={'30px'}
        />

      <ScoreBoard />
    </div>
  );
}

export default App;
