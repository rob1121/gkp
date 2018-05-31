import React from 'react';

export default ({size, icon}) => (
  <span className={`icon is-${size || 'small'}`}>
    <i className={`fa fa-${icon || ''}`} />
  </span>
);

