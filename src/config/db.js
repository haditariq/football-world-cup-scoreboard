import Dexie from 'dexie';

const db = new Dexie('footballscorecard');
db.version(1).stores({
  team: 'id,name,createdAt',
  match: 'id,homeTeam,awayTeam,isActive,createdAt',
  scoreboard: 'id,away,home,createdAt,matchId',
});
export default db;