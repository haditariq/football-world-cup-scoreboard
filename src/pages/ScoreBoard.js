import React from 'react';
import Heading from '../components/Heading';
import TextField from '../components/TextField';

const ScoreBoard = () => {
  return (
    <div className={'scoreBoardContainer'}>
      <div>
        <Heading title={'New Game'} fontWeight={'bold'} fontSize={'20px'} />

        <div>
          <Heading title={'Home Team:'} fontWeight={'bold'} />
          <TextField />
          <Heading title={'Away Team:'} fontWeight={'bold'} />
          <TextField />
        </div>
      </div>
      <div>
        <Heading title={'Update Score'} fontWeight={'bold'} fontSize={'20px'} />
      </div>
    </div>
  );
};

export default ScoreBoard;
