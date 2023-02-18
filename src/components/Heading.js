import React from 'react';

const Heading = ({ title, fontSize, fontWeight }) => {
  return (
    <p
      data-testid={'heading'}
      style={{
        fontSize,
        fontWeight,
      }}
    >
      {title}
    </p>
  );
};

export default Heading;
