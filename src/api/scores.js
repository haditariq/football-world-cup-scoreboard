import uuid from 'react-uuid';
import db from '../config/db';

const scoresService = {
  postScoreBoard: async (matchId) => {
    const scoreboard = await db.scoreboard.add({
      id: uuid(),
      away: 0,
      home: 0,
      matchId,
      createdAt: new Date(),
    });
    return scoreboard
  },
  getScoreBoardByMatchId: async (selectedMatchId) => {
    return await db.scoreboard.get({ matchId: selectedMatchId });
  },
  updateScoresByMatchId: async ({ matchId, homeScore, awayScore }) => {
    const scoreDoc = await db.scoreboard.get({ matchId });
    return await db.scoreboard.update(scoreDoc.id, {
      home: homeScore,
      away: awayScore,
    });
  },
};

export default scoresService;
