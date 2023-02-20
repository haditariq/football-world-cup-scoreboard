import uuid from 'react-uuid';
import db from '../config/db';

const matchesService = {
  postMatch: async ({ homeTeam, awayTeam }) => {
    const doc = await db.match.add({
      id: uuid(),
      homeTeam,
      awayTeam,
      isActive: true,
      createdAt: new Date(),
    });
    return await db.match.get({ id: doc });
  },
  getMatches: async () => {
    let list = await db.match.toArray().catch((err) => console.log(err));
    // if (!list) return [];

    const populatedList = [];

    return new Promise(async (resolve, reject) => {
      await list.forEach(async (i, idx) => {
        populatedList.push({
          id: i.id,
          homeTeam: await db.team.get({ id: i.homeTeam }),
          awayTeam: await db.team.get({ id: i.awayTeam }),
          isActive: i.isActive,
          createdAt: i.createdAt,
        });
        if (idx == list.length - 1) {
          resolve(populatedList);
        }
      });
    });
  },
};

export default matchesService;
