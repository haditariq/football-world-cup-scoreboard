import React, { useState } from 'react';
import Heading from '../components/Heading';
import TextField from '../components/TextField';
import Button from '../components/Button';
import DataList from '../components/DataList';

const ScoreBoard = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  const [createGameError, setCreateGameError] = useState('');
  const [updateGameError, setUpdateGameError] = useState('');

  const [teams, setTeams] = useState(['dff', 'fsfd', 'fsdfsd']);

  const [selectedMatch, setSelectedMatch] = useState(null);

  const [allMatches, setAllMatches] = useState([]);

  const onChangeHomeTeamName = (e) => setHomeTeam(e);
  const onChangeAwayTeamName = (e) => setAwayTeam(e);

  const onChangeAwayScore = (e) => setAwayScore(e);
  const onChangeHomeScore = (e) => setHomeScore(e);

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
          <div>
            <div style={{ position: 'relative' }}>
              <TextField
                placeholder={'Enter Home Team Score...'}
                value={homeScore}
                onChange={onChangeHomeScore}
                className={'inputField'}
              />

              {homeTeam.length > 0 && teams.length > 0 && (
                <DataList list={teams} />
              )}
            </div>

            <Heading title={'Away Team:'} fontWeight={'bold'} />
            <div style={{ position: 'relative' }}>
              <TextField
                placeholder={'Enter Away Team Score...'}
                value={awayScore}
                onChange={onChangeAwayScore}
                className={'inputField'}
              />

              {awayTeam.length > 0 && teams.length > 0 && (
                <DataList list={teams} />
              )}
            </div>

            <div className={['red-color vertical-space'].join(' ')}>
              {createGameError.length > 0 && (
                <Heading title={createGameError} />
              )}
            </div>

            <Button
              title={'Sart Game'}
              onPress={onCreateNewGame}
              className={'submitButton'}
            />
          </div>
        </div>
      </div>

      <div>
        <div className='textAlign'>
          <Heading
            title={'Update Score'}
            fontWeight={'bold'}
            fontSize={'20px'}
          />
          <Heading
            title={'Please select a match to edit scores.'}
            fontWeight={'normal'}
          />
        </div>

        <select
          name='cars'
          id='cars'
          className='selectOptionForMatch'
          onChange={(e) => alert(e.target.value)}
        >
          <option value='select'>Select a match</option>
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='opel'>Opel</option>
          <option value='audi'>Audi</option>
        </select>

        <div className='formContainer'>
          <Heading title={'Brazil (home):'} fontWeight={'bold'} />

          <TextField
            placeholder={'Enter Home Team Name...'}
            value={homeTeam}
            onChange={onChangeHomeTeamName}
            className={'inputField'}
            disabled={!selectedMatch ? true : false}
          />
        </div>

        <Heading title={'Portogal (away):'} fontWeight={'bold'} />
        <TextField
          placeholder={'Enter Away Team Name...'}
          value={awayTeam}
          onChange={onChangeAwayTeamName}
          className={'inputField'}
          disabled={!selectedMatch ? true : false}
        />

        <div className={['red-color vertical-space'].join(' ')}>
          {updateGameError.length > 0 && <Heading title={updateGameError} />}
        </div>

        <Button
          title={'Update Score'}
          onPress={onCreateNewGame}
          className={'submitButton'}
          disabled={!selectedMatch ? true : false}
        />
      </div>
    </div>
  );
};

export default ScoreBoard;
