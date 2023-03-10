import uuid from 'react-uuid';
import ScoreBoardService from './scores';
import db from '../config/db';

const matchesService = {
  postMatch: async ({ homeTeam, awayTeam }) => {
    try {
      const doc = await db.match.add({
        id: uuid(),
        homeTeam,
        awayTeam,
        isActive: true,
        createdAt: new Date(),
      });
      await ScoreBoardService.postScoreBoard(doc);
      return await db.match.get({ id: doc });
    } catch (error) {
      console.error(error, 'postMatch');
    }
  },
  getMatches: async (type, list) => {
    try {
      // let list = await db.match
      //   .toArray()
        // .get({ isActive: true })
        // .catch((err) => console.log(err));
      if (!list) return [];

      const populatedList = [];

      return new Promise(async (resolve, reject) => {
        await list?.forEach(async (i, idx) => {
          const obj = {
            id: i.id,
            homeTeam: await db.team.get({ id: i.homeTeam }),
            awayTeam: await db.team.get({ id: i.awayTeam }),
            isActive: i.isActive,
            createdAt: i.createdAt,
          };
          if (type !== 'all') {
            if (i.isActive === true) {
              populatedList.push(obj);
            }
          } else {
            populatedList.push(obj);
          }
          if (idx == list.length - 1) {
            resolve(populatedList);
          }
        });
      });
    } catch (e) {
      console.log(e.message, 'getMatches');
    }
  },
  endMatch: async (matchId) => {
    try {
      return await db.match.update(matchId, {
        isActive: false,
      });
    } catch (e) {
      console.log(e.message, 'endMatch');
    }
  },
};

export default matchesService;
