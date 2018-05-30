import React from 'react';

export default ({ offset, width, overflowX, children }) => {
  let cn = 'column ';
  cn += offset ? `is-offset-${offset} ` : ' ';
  cn += width ? `is-${width} ` : 'is-12 ';

  return (
    <div className="columns">
      <div className={cn} style={{ overflowX }}>
        {children}
      </div>
    </div>
  );
};