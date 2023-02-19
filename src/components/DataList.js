import React from 'react';

const DataList = ({ list }) => {
  return (
    <div className='datalistContainer'>
      <ul>
        {list.map((i, idx) => (
          <li>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
