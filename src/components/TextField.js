import React from 'react';

const TextField = ({ value, placeholder, onChange }) => {
  return (
    <div>
      <input
        data-testid={'textField'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
