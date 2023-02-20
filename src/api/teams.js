import db from '../config/db';
import uuid from 'react-uuid';

const teamsService = {
  postTeam: async (name) => {
    const isNameExists = await db.team.get({ name });
    if (!isNameExists) {
      const doc = await db.team.add({
        id: uuid(),
        name,
        createdAt: new Date(),
      });
      return doc;
    } else {
      return isNameExists.id;
    }
  },
  getTeams: async () => {
    const list = await db.team
      .toArray()
      .catch((err) => console.log(err.message, 'here'));
    if (!list) return [];
    return list;
  },
};

export default teamsService;
