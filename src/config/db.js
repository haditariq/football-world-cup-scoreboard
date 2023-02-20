import Dexie from 'dexie';

const db = new Dexie('football-scorecard');
db.version(1).stores({
  team: 'id,name,createdAt',
  match: 'id,homeTeam -> teams.id,awayTeam -> team.id,createdAt',
  scoreboard: 'id,away,home,createdAt,matchId -> match.id',
});
// db.open();

export default db;

// db.createObjectStore()
// db.createObjectStore("team", { keyPath: "teams_list"});

// Output the schema of each table:
// db.tables.forEach(function (table) {
//   console.log('Schema of ' + table.name + ': ' + JSON.stringify(table.schema));
// });
