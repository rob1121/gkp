import React from 'react';

export default ({ active, fadeBlock, title, remove, children, ok, isLoading }) => {
  let modalClass = 'modal';
  if (active) modalClass += ' is-active';

  let modalButtonClass = 'button is-success is-pulled-right';
  if (isLoading) modalButtonClass += 'is-loading';

  return (
    <div className={modalClass}>
      <div className="modal-background" onClick={fadeBlock} role="button" tabIndex="0" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {title}
          </p>
          <button className="delete" onClick={remove} />
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
          <div className="container">
            <button className={modalButtonClass} onClick={ok}>
              <span>OK</span>
              <span className="icon is-small">
                <i className="fa fa-check" />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};