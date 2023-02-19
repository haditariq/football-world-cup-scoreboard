import React from 'react';

const TextField = ({ value, placeholder, onChange, className, disabled }) => {
  return (
    <div>
      <input
        data-testid={'textField'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;
