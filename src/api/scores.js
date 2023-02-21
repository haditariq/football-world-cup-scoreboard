import uuid from 'react-uuid';
import db from '../config/db';

const scoresService = {
  postMatch: async (matchId) => {
    const scoreboard = await db.scoreboard.add({
      id: uuid(),
      away: 0,
      home: 0,
      matchId,
      createdAt: new Date(),
    });
    console.log(scoreboard);
  },
  getScoreBoardByMatchId: async (selectedMatchId) => {
    return await db.scoreboard.get({ matchId: selectedMatchId });
  },
};

export default scoresService;
