import React from 'react';
import { map } from 'lodash';

/**
 * this components used by platform, err_code, wrn_code
 *
 * @param  {string} name platform, err_code, or wrn_code
 */
const optionArr = (name, arr) => {
  let eSuffix = ''; /* name of suffix but for err_code and wrn_code name only */
  let retVal = []; /* selection options */

  /* populate options */
  retVal = map(arr, option =>
    (<option value={option} key={option}>
      {option}
    </option>),
  );

  /* add as first option */
  /* title, readonly */
  retVal.unshift(
    <option disabled value="" key={name}>
      SELECT {name.toUpperCase()}
    </option>,
  );

  /* if name has _ */
  if (name.includes('_')) {
    eSuffix = name.split('_')[0]; /* get SUFFIX 'err' or 'wrn' */

    /* option to select all err or wrn */
    retVal.push(
      <option value={`!${eSuffix.toUpperCase()} 0x0`} key={`!${eSuffix} 0x0`}>
        All {eSuffix.toUpperCase()}
      </option>,
    );
  }

  return retVal;
};

export default ({ name, onChange, options }) => (
  <div className="field">
    <p className="help is-default">
      {name.toUpperCase()}
    </p>
    {options && <div className="select is-small">
      <select
        className="input is-small"
        name={name.toLowerCase()}
        defaultValue=""
        onChange={e => onChange(e.target.value)}
      >
        {optionArr(name, options)}

        <option value="">ALL</option>
        </select>
      </div>}
    </div>
);