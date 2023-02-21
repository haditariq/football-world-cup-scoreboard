import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import SummaryService from '../api/summary';
import Heading from './Heading';

const ScoreBoardSummary = () => {
  let summaryList =
    useLiveQuery(async () => {
      return await SummaryService.getSummary('all');
    }) || [];

    if(!summaryList.length) return <Heading title={"No matches!"}/>
  return (
    <table>
      <tr>
        <th>Teams & scores</th>
        <th>Status</th>
      </tr>

      {summaryList.map((item, idx) => {
        return (
          <tr key={idx}>
            <td>
              {item.homeTeam.name} {item.scoreboard.home} - {item.awayTeam.name}{' '}
              {item.scoreboard.away}
            </td>
            <td>{item?.isActive ? 'In Progress' : 'Ended'}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default ScoreBoardSummary;
