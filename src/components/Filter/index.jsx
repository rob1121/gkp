import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {FILTERS_URL} from '../../constants';
import { updateQuery, updatePagination, setColumn, setWrnCode, setErrCode, setPlatform } from '../../actions';
import Typeahead from '../Form/Typeahead';
import Select from '../Form/Select';
import Limit from '../Form/Limit';
import DatePicker from '../Form/DatePicker';
import FilterColumn from '../Form/FilterColumn';
import FilterDownload from '../Form/FilterDownload';
import CollapsePanel from '../Form/CollapsePanel';
import Row from '../Utilities/Row';

class Index extends React.Component {

  /**
   * set initial state of the page
   */
  componentWillMount() {
    axios(FILTERS_URL)
    .then(this.updateFilters);
  }

  componentDidUpdate = (nextProps) => {
    const isPageHasNewUpdate = JSON.stringify(nextProps.page) !== JSON.stringify(this.props.page);
    return isPageHasNewUpdate;
  }

  updateFilters = ({ data: { platform, err_code, wrn_code, columns } }) => {
    const {setColumn, setWrnCode, setErrCode, setPlatform} = this.props;

    setColumn(columns);
    setWrnCode(wrn_code);
    setErrCode(err_code);
    setPlatform(platform);
  }

  render() {
    const { home_filter, query, page, updatePagination, updateQuery, setSelectedColumns } = this.props;

    return (
      <Row width={10} offset={1}>
        <CollapsePanel title="FILTERS" isCollapse>
          <div className="field">
            <div className="field-body">
              <Limit page={page} onChange={per_page => updatePagination({per_page}) } />

              {/* get lot_id dynamically */}
              <Typeahead onChange={id => updateQuery({ lot_id: (id ? id[0] : '') })} />

              {/* get startDate and endDate */}
              <DatePicker
                date_range={query.date_range}
                onChange={date_range => updateQuery({ date_range })}
                name="date_range"
              />

              {/* platform selection */}
              <Select
                name="platform"
                options={home_filter.platform}
                onChange={platform => updateQuery({ platform })}
              />

              {/* err_code selection */}
              <Select
                name="err_code"
                options={home_filter.err_code}
                onChange={ err_code => updateQuery({ err_code })}
              />

              {/* wrn_code selection */}
              <Select
                name="wrn_code"
                options={home_filter.wrn_code}
                onChange={wrn_code => updateQuery({ wrn_code })}
              />

              <FilterColumn
                options={home_filter.columns}
                selected={home_filter.selected_columns}
                onChecked={setSelectedColumns}
              />

              <FilterDownload query={query} columns={home_filter.selected_columns} />
            </div>
          </div>
        </CollapsePanel>
      </Row>
    );
  }
}

const mapStateToProps = ({ query, page, home_filter }) => ({ query, page, home_filter });

export default connect(mapStateToProps, { updateQuery, updatePagination, setColumn, setWrnCode, setErrCode, setPlatform })(Index);
