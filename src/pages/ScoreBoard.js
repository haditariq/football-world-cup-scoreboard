import React, { useState } from 'react';
import Heading from '../components/Heading';
import TextField from '../components/TextField';
import Button from '../components/Button';

const ScoreBoard = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [createGameError, setCreateGameError] = useState('');

  const onChangeHomeTeamName = (e) => setHomeTeam(e);
  const onChangeAwayTeamName = (e) => setAwayTeam(e);

  const onCreateNewGame = () => {
    if (!awayTeam.length) {
      setCreateGameError('Please fill away team name.');
    } else if (!homeTeam.length) {
      setCreateGameError('Please fill home team name.');
    } else {
      // query to add data to
    }
  };
  return (
    <div className={'scoreBoardContainer'}>
      <div>
        <div className='textAlign'>
          <Heading title={'New Game'} fontWeight={'bold'} fontSize={'20px'} />
        </div>

        <div className='formContainer'>
          <Heading title={'Home Team:'} fontWeight={'bold'} />
          <TextField
            placeholder={'Enter Home Team Name...'}
            value={homeTeam}
            onChange={onChangeHomeTeamName}
            className={'inputField'}
          />

          <Heading title={'Away Team:'} fontWeight={'bold'} />
          <TextField
            placeholder={'Enter Away Team Name...'}
            value={awayTeam}
            onChange={onChangeAwayTeamName}
            className={'inputField'}
          />

          {createGameError.length > 0 && (
            <div className='red-color'>
              <Heading title={createGameError} />
            </div>
          )}

          <Button
            title={'Sart Game'}
            onPress={onCreateNewGame}
            className={'submitButton'}
          />
        </div>
      </div>
      <div>
        <div className='textAlign'>
          <Heading
            title={'Update Score'}
            fontWeight={'bold'}
            fontSize={'20px'}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
