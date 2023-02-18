import './App.css';
import Heading from './components/Heading';
import ScoreBoard from './pages/ScoreBoard';

function App() {
  return (
    <div className='App'>
      <div className='textAlign'>
        <Heading
          title={'Live Football World Cup Scoreboard'}
          fontWeight={'bold'}
          fontSize={'30px'}
        />
      </div>
      <ScoreBoard />
    </div>
  );
}

export default App;
