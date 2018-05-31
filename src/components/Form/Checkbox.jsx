import React from 'react';
import { toUpper } from 'lodash';

export default ({name, checked, onChange}) =>
  (<label className="checkbox" htmlFor={name}>
    <input type="checkbox" checked={checked} name={name} onChange={onChange} />
    {toUpper(name)}
  </label>);
