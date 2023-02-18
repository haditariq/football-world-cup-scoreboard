import React from 'react';

const TextField = ({ value, placeholder, onChange, className }) => {
  return (
    <div>
      <input
        data-testid={'textField'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default TextField;
