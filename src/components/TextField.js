import React from 'react';

const TextField = ({ value, placeholder, onChange }) => {
  return (
    <input
      data-testid={'textField'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextField;
