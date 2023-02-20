import React from 'react';

const DataList = ({ list, onSelect }) => {
  return (
    <div className='datalistContainer'>
      <ul onClick={(e) => onSelect(e.target.value)}>
        {list.map((i, idx) => (
          <li key={idx}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
