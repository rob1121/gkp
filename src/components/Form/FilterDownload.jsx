import React from 'react';

export default ({ columns, query }) => {
  let downloadLink = '/gatekeeper/download/search?';
  downloadLink += `selectedColumns=${columns}`;
  downloadLink += `&lotId=${query.lot_id}`;
  downloadLink += `&sortType=${query.sort_type}`;
  downloadLink += `&colToSort=${query.sort_col}`;
  downloadLink += `&platform=${query.platform}`;
  downloadLink += `&errCode=${query.err_code}`;
  downloadLink += `&wrnCode=${query.wrn_code}`;
  downloadLink += `&startDate=${query.date_range[0]}`;
  downloadLink += `&endDate=${query.date_range[1]}`;

  return (
    <div className="field">
      <p className="help">&nbsp;</p>
      <a href={downloadLink} className="button is-default is-small">
        <span className="icon is-small">
          <i className="fa fa-download" />
        </span>
        <span>Download</span>
      </a>
    </div>
  );
};