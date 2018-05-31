import React from 'react';

export default ({ page, onChange }) => {
  const options = [10, 25, 50, 100].map(item => (<option key={item} value={item}>{item}</option>));

  return (
    <div className="field">
      <p className="help">DISPLAY</p>
      <div className="select is-small">
        <select
          className="input is-small"
          defaultValue={page.per_page}
          onChange={e => onChange(e.target.value)}
        >
          {options}
        </select>
      </div>
    </div>
  );
};
