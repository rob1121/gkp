import React from 'react';
import Body from './Body';
import Header from './Header';

export default () => (
  <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
    <table className="table is-narrow" style={{ whiteSpace: 'nowrap' }}>
      <Header />
      <Body />
    </table>
  </div>
);
