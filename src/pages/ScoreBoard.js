import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import TextField from '../components/TextField';
import Button from '../components/Button';
import DataList from '../components/DataList';
import TeamService from '../api/teams';
import MatchService from '../api/matches';
import { useLiveQuery } from 'dexie-react-hooks';
import ScoreBoardSummary from '../components/ScoreBoardSummary';
import ScoreBoardService from '../api/scores';
import db from '../config/db';

const ScoreBoard = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  const [createGameError, setCreateGameError] = useState('');
  const [updateGameError, _] = useState('');

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

  const onCreateNewGame = async () => {
    if (!awayTeam.length) {
      setCreateGameError('Please fill away team name.');
    } else if (!homeTeam.length) {
      setCreateGameError('Please fill home team name.');
    } else {
      setHomeTeam('');
      setAwayTeam('');

      // query to add data to
      const homeTeamDoc = await TeamService.postTeam(homeTeam);
      const awayTeamDoc = await TeamService.postTeam(awayTeam);
      await MatchService.postMatch({
        homeTeam: homeTeamDoc,
        awayTeam: awayTeamDoc,
      });
      window.location.reload(true);
    }
  };

  let teams = useLiveQuery(async () => {
    return await db.team.toArray();
  });

  let matches = useLiveQuery(async () => {
    const list = await db.match.toArray();
    return await MatchService.getMatches('other', list);
  });

  if (!matches) matches = [];
  if (!teams) teams = [];

  const filterHomeTeams = () => {
    const filtered = [...removeSelectedTeams()]?.filter(
      (i) => i.name.toLowerCase()?.indexOf(homeTeam.toLowerCase()) !== -1
    );
    return filtered;
  };

  const filterAwayTeams = () => {
    const filtered = [...removeSelectedTeams()].filter(
      (i) => i.name.toLowerCase()?.indexOf(awayTeam.toLowerCase()) !== -1
    );
    return filtered || [];
  };

  const removeSelectedTeams = () => {
    if (!homeTeam.length && !awayTeam.length) return teams || [];

    const filtered = teams?.filter(
      (i) =>
        i.name?.indexOf(homeTeam.toLowerCase()) === -1 ||
        i.name?.indexOf(awayTeam) === -1
    );
    return filtered || [];
  };

  const getScoreBoard = async () => {
    const scoreBoard = await ScoreBoardService.getScoreBoardByMatchId(
      selectedMatch?.id
    );
    setHomeScore(scoreBoard?.home);
    setAwayScore(scoreBoard?.away);
  };

  const onUpdateGame = async () => {
    // update scores on away and hometeam
    await ScoreBoardService.updateScoresByMatchId({
      matchId: selectedMatch.id,
      homeScore,
      awayScore,
    });
    setSelectedMatch(null);
  };

  const onEndGame = async () => {
    // end match: turn isActive status false
    await MatchService.endMatch(selectedMatch.id);
    setSelectedMatch(null);
  };

  useEffect(() => {
    getScoreBoard();
  }, [selectedMatch]);

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
          className='selectOptionForMatch'
          onChange={(e) => setSelectedMatch(matches[e.target.value])}
        >
          <option value='select'>Select a match</option>
          {matches?.map((i, idx) => (
            <option value={idx} key={idx}>
              {i.homeTeam.name} - {i.awayTeam.name}
            </option>
          ))}
        </select>

        <div className='formContainer'>
          <Heading
            title={`${
              selectedMatch ? selectedMatch?.homeTeam.name : ''
            } (home):`}
            fontWeight={'bold'}
          />

          <TextField
            placeholder={'Enter Home Team Score...'}
            value={homeScore}
            onChange={onChangeHomeScore}
            className={'inputField'}
            disabled={!selectedMatch ? true : false}
          />
        </div>

        <Heading
          title={`${selectedMatch ? selectedMatch?.awayTeam.name : ''} (away):`}
          fontWeight={'bold'}
        />
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='width45'>
            <Button
              title={'Update Score'}
              onPress={onUpdateGame}
              className={'submitButton'}
              disabled={!selectedMatch ? true : false}
            />
          </div>
          <div className='width45'>
            <Button
              title={'End Game'}
              onPress={() => onEndGame()}
              className={'submitButton'}
              disabled={!selectedMatch ? true : false}
            />
          </div>
        </div>
      </div>

      <div>
        <div className='textAlign'>
          <Heading title={'Summary'} fontWeight={'bold'} fontSize={'20px'} />
        </div>
        <ScoreBoardSummary />
      </div>
    </div>
  );
};

export default ScoreBoard;
