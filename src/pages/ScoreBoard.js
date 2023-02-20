import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import TextField from '../components/TextField';
import Button from '../components/Button';
import DataList from '../components/DataList';
import TeamService from '../api/teams';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../config/db';

const ScoreBoard = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  const [createGameError, setCreateGameError] = useState('');
  const [updateGameError, setUpdateGameError] = useState('');

  const [selectedMatch, setSelectedMatch] = useState(null);

  const [isHomeTeamSet, setIsHomeTeamSet] = useState(true);
  const [isAwayTeamSet, setIsAwayTeamSet] = useState(true);

  const onChangeHomeTeamName = (e) => {
    setHomeTeam(e);
    setIsHomeTeamSet(false);
  };

  const onChangeAwayTeamName = (e) => {
    setAwayTeam(e);
    setIsAwayTeamSet(false);
  };

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

  const createNewTeam = async () => {
    console.log(await TeamService.postTeam('jingle'));
  };

  // const teams = useLiveQuery(async () => {
  //   return await db.team.toArray();
  // });

  const teams = [
    { name: 'barzil' },
    { name: 'argentina' },
    { name: 'Portugal' },
    { name: 'madrid' },
  ];

  const filterHomeTeams = () => {
    const filtered = [...removeSelectedTeams()].filter(
      (i) => i.name.indexOf(homeTeam.toLowerCase()) !== -1
    );
    console.log({ filtered });
    return filtered;
  };

  const filterAwayTeams = () => {
    const filtered = [...removeSelectedTeams()].filter(
      (i) => i.name.indexOf(awayTeam.toLowerCase()) !== -1
    );
    return filtered;
  };

  const removeSelectedTeams = () => {
    const filtered = teams.filter(
      (i) => i.name.indexOf(homeTeam) == -1 || i.name.indexOf(awayTeam) == -1
    );
    console.log('FILLLLLL', filtered);
    return filtered;
  };

  useEffect(() => {
    // createNewTeam()
  }, []);

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
                placeholder={'Enter Home Team Name...'}
                value={homeTeam}
                onChange={onChangeHomeTeamName}
                className={'inputField'}
              />

              {!isHomeTeamSet &&
                filterHomeTeams().length > 0 &&
                homeTeam.length > 0 &&
                teams.length > 0 && (
                  <DataList
                    list={[...filterHomeTeams()]}
                    onSelect={(e) => {
                      setHomeTeam([...filterHomeTeams()][e].name);
                      setIsHomeTeamSet(true);
                    }}
                  />
                )}
            </div>

            <Heading title={'Away Team:'} fontWeight={'bold'} />
            <div style={{ position: 'relative' }}>
              <TextField
                placeholder={'Enter Away Team Score...'}
                value={awayTeam}
                onChange={onChangeAwayTeamName}
                className={'inputField'}
              />

              {!isAwayTeamSet &&
                filterAwayTeams().length > 0 &&
                awayTeam.length > 0 &&
                teams.length > 0 && (
                  <DataList
                    list={[...filterAwayTeams()]}
                    onSelect={(e) => {
                      setAwayTeam([...filterAwayTeams()][e].name);
                      setIsAwayTeamSet(true);
                    }}
                  />
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
            placeholder={'Enter Home Team Score...'}
            value={homeScore}
            onChange={onChangeHomeScore}
            className={'inputField'}
            disabled={!selectedMatch ? true : false}
          />
        </div>

        <Heading title={'Portogal (away):'} fontWeight={'bold'} />
        <TextField
          placeholder={'Enter Away Team Score...'}
          value={awayScore}
          onChange={onChangeAwayScore}
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
