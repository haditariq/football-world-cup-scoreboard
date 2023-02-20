import db from '../config/db';

const teamsService = {
  postTeam: async (name) => {
    const isNameExists = await db.team.where({ name });
    console.log({ isNameExists });
    return await db.team
      .add({
        id: 1,
        name,
        createdAt: new Date(),
      })
      .catch((e) => console.log(e.message));
  },
  getTeams: async () => await db.team.toArray(),
};

export default teamsService;
