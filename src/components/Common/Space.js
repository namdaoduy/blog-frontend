import React from 'react';

const Space = ({ height }) => (
  <div style={{
    height: height || 10,
    width: '100%',
    margin: 0,
  }}
  />
);

export default Space;
