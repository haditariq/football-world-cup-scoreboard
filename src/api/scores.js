import uuid from 'react-uuid';
import db from '../config/db';

const scoresService = {
  postScoreBoard: async (matchId) => {
    try {
      const scoreboard = await db.scoreboard.add({
        id: uuid(),
        away: 0,
        home: 0,
        matchId,
        createdAt: new Date(),
      });
      return scoreboard;
    } catch (error) {
      console.error(error, 'postScoreBoard');
    }
  },
  getScoreBoardByMatchId: async (selectedMatchId) => {
    try {
      return await db.scoreboard.get({ matchId: selectedMatchId });
    } catch (error) {
      console.error(error, 'getScoreBoardByMatchId');
    }
  },
  updateScoresByMatchId: async ({ matchId, homeScore, awayScore }) => {
    try{
    const scoreDoc = await db.scoreboard.get({ matchId });
    return await db.scoreboard.update(scoreDoc.id, {
      home: homeScore,
      away: awayScore,
    });
  } catch (error) {
    console.error(error, 'updateScoresByMatchId');
  }
  },
};

export default scoresService;
