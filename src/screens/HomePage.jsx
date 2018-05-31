import React, { Component } from 'react';
import {connect} from 'react-redux';
import { setSTDFLogs} from '../actions';
import Footer from '../components/Footer';
import Filter from '../components/Filter';


class HomePage extends Component {
  state = {
    isLoading: false,
  }


  componentDidUpdate = (nextProps) => {
    const isPageHasNewUpdate = JSON.stringify(nextProps.page) === JSON.stringify(this.props.page);
    if (!isPageHasNewUpdate) return;

    const { page } = nextProps;
    const totalRowBrowsed = page.per_page * page.current_page;
    const pages = ((page.total > totalRowBrowsed) ? totalRowBrowsed : page.total) / page.per_page;
    const currentPage = Math.ceil(pages);

    this.updateSTDFLogs(currentPage);
  }

  updateSTDFLogs = currentPage => {
    const {
      lot_id,
      sort_type,
      sort_col,
      platform,
      err_code,
      wrn_code,
      date_range,
    } = this.props.query;
    
    const params = {
      lotId: lot_id,
      sortType: sort_type,
      colToSort: sort_col,
      errCode: err_code,
      wrnCode: wrn_code,
      startDate: date_range[0],
      endDate: date_range[1],
      page,
      perPage,
      platform,
    };

      const perPage = getState().search.paginate.per_page;
      // server request
      axios('/gatekeeper/api/search', {params})
      .then(this.updateSTDFLogs);
  }

  updateSTDFLogs = response => {
    // format data
    const data = map(response.data.data, (result) => {
      const retVal = result;

      retVal.file_size = parseInt(retVal.file_size, 10) * 0.001;
      retVal.file_size = retVal.file_size.toLocaleString();
      retVal.file_size += 'kb';
      retVal.transfer_time = retVal.transfer_time;
      retVal.transfer_time += 's';
      retVal.parse_time = retVal.parse_time;
      retVal.parse_time += 's';

      return retVal;
    });

    this.props.setSTDFLogs(data);
  }
  
  render() {
    return (
      <div>
        <Filter />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ page, query, stdf_logs }) => ({ page, query, stdf_logs });

  export default connect(mapStateToProps, { setSTDFLogs })(HomePage);
