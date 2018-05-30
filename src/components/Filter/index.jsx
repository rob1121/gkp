import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import {FILTERS_URL} from '../../constants';
import Typeahead from './Forms/Typeahead';
import Select from './Forms/Select';
import Limit from './Forms/Limit';
import DatePicker from './Forms/DatePicker';
import FilterColumn from '../components/FilterColumn';
import FilterDownload from './Filter.Download';
import CollapsePanel from './Layout/CollapsePanel';
import Row from './Layout/Row';

export default class Filter extends React.Component {
  state = {
    options: {
      columns: [],
      platform: [],
      err_code: [],
      wrn_code: [],
    },
  }

  /**
   * set initial state of the page
   */
  componentWillMount() {
    axios(FILTERS_URL)
    .then(this.updateFilters);
  }

  updateFilters = ({ data: { platform, err_code, wrn_code, columns } }) => {
    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        platform,
        err_code,
        wrn_code,
        columns,
      },
    });
  }

  /**
   * update query
   *
   * @param  {object} newQuery new user input query
   */
  updateQuery = newQuery => {
    const { query, setQuery } = this.props;
    setQuery({ ...query, ...newQuery });
  }

  updatePerPage = newPage => {
    const { page, setPerPage, fetchPaginateResult } = this.props;
    const totalRowBrowsed = page.per_page * page.current_page;
    const pages = (page.total > totalRowBrowsed ? totalRowBrowsed : page.total) / newPage;
    const currentPage = Math.ceil(pages);

    /* set per_page state */
    setPerPage(newPage).then(() => {
      fetchPaginateResult(currentPage);
    });
  }

  render() {
    const { query, page, selectedColumns, setSelectedColumns } = this.props;
    const { options } = this.state;

    return (
      <Row width={10} offset={1}>
        <CollapsePanel title="FILTERS" isCollapse>
          <div className="field">
            <div className="field-body">
              <Limit page={page} onChange={this.updatePerPage} />

              {/* get lot_id dynamically */}
              <Typeahead onChange={id => this.updateQuery({ lot_id: id ? id[0] : '' })} />

              {/* get startDate and endDate */}
              <DatePicker
                date_range={query.date_range}
                onChange={dateRange => this.updateQuery({ date_range: dateRange })}
                name="date_range"
              />

              {/* platform selection */}
              <Select
                name="platform"
                options={options.platform}
                onChange={platform => this.updateQuery({ platform })}
              />

              {/* err_code selection */}
              <Select
                name="err_code"
                options={options.err_code}
                onChange={errCode => this.updateQuery({ err_code: errCode })}
              />

              {/* wrn_code selection */}
              <Select
                name="wrn_code"
                options={options.wrn_code}
                onChange={wrnCode => this.updateQuery({ wrn_code: wrnCode })}
              />

              <FilterColumn
                options={options.columns}
                selected={selectedColumns}
                onChecked={setSelectedColumns}
              />

              <FilterDownload query={query} columns={selectedColumns} />
            </div>
          </div>
        </CollapsePanel>
      </Row>
    );
  }
}

Filter.propTypes = {
  query: PropTypes.shape({
    platform: PropTypes.string,
    err_code: PropTypes.string,
    wrn_code: PropTypes.string,
    lot_id: PropTypes.string,
    sort_type: PropTypes.number,
    sort_col: PropTypes.string,
    date_range: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  page: PropTypes.shape({
    total: PropTypes.number,
    per_page: PropTypes.number,
    current_page: PropTypes.number,
    last_page: PropTypes.number,
  }).isRequired,
  selectedColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setQuery: PropTypes.func.isRequired,
  setPerPage: PropTypes.func.isRequired,
  fetchPaginateResult: PropTypes.func.isRequired,
  setSelectedColumns: PropTypes.func.isRequired,
};
