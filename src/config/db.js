import Dexie from 'dexie';

const db = new Dexie('footballscorecard');
db.version(2).stores({
  team: 'id,name,createdAt',
  match: 'id,homeTeam->team.id,awayTeam->team.id,isActive,createdAt',
  scoreboard: 'id,away,home,createdAt,matchId->match.id',
});

db.open()
export default db;