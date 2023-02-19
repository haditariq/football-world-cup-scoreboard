import Dexie from 'dexie';

export const db = new Dexie('football-scorecard');
db.version(1).stores({
  team: '++id,name,createdAt',
  matche: '++id,homeTeam -> teams.id,awayTeam -> team.id,createdAt',
  scoreboard: '++id,away,home,createdAt,matchId -> matche.id',
});
db.open();

// Output the schema of each table:
db.tables.forEach(function (table) {
  console.log('Schema of ' + table.name + ': ' + JSON.stringify(table.schema));
});
