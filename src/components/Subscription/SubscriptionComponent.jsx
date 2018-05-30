import React from 'react';

export default ({ email, error, isLoading, updateEmail, subscribe}) => {
  let buttonClass = 'button is-dark';
  if (isLoading) buttonClass += ' is-loading';

  return (
    <div className="">
      <div className="content has-text-centered">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              type="text"
              className="input"
              placeholder="Email..."
              value={email}
              onChange={e => updateEmail(e.target.value)}
            />
            {error && <small className="help is-danger">{error}</small>}
          </p>
          <p className="control">
            <button className={buttonClass} onClick={subscribe} style={{ border: '1px solid #555' }}>
              <small>Subscribe</small>
              <span className="icon">
                <i className="fa fa-envelope-o" />
              </span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}