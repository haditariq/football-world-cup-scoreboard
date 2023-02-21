import db from '../config/db';
import MatchesService from './matches';
const SummaryService = {
  getSummary: async (type) => {
    const list = await db.match.toArray()
    const listOfMatches = await MatchesService.getMatches(type, list);

    return new Promise((resolve, reject) => {
      listOfMatches.forEach(async (item, idx) => {
        const scoreboard = await db.scoreboard.get({ matchId: item.id });
        item.scoreboard = scoreboard;
        if (idx == listOfMatches.length - 1) {
          resolve(listOfMatches);
        }
      });
    })
      .then((data) => {
        const sortedByDate = data.sort((a, b) => {
          const totala = a.scoreboard.away + a.scoreboard.home;
          const totalb = b.scoreboard.away + b.scoreboard.home;
          if (totala == totalb) {
            return b.createdAt - a.createdAt;
          } else {
            return totala - totalb;
          }
        });

        return sortedByDate;
      })
      .catch((err) => {
        console.log(err.message, 'SUMMARY ERROR!!');
        // alert('Something went wrong with the summary.');
      });
  },
};

export default SummaryService;
