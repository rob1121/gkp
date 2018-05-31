import React from 'react';

export default ({children, size, onClick}) => (
  <button className={`button is-${size || 'small'}`} onClick={onClick}>{children}</button>
);