import Dexie from 'dexie';

const db = new Dexie('footballscorecard');
db.version(1).stores({
  team: 'id,name,createdAt',
  match: 'id,homeTeam->team.id,awayTeam->team.id,isActive,createdAt',
  scoreboard: 'id,away,home,createdAt,matchId->team.id',
});

// db.open();

export default db;
// Output the schema of each table:
// db.tables.forEach(function (table) {
//   console.log('Schema of ' + table.name + ': ' + JSON.stringify(table.schema));
// });
