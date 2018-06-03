import React, { Component } from 'react';
import {connect} from 'react-redux';
import {axios} from 'axios';
import {map} from 'lodash';
import { setSTDFLogs, updatePagination } from '../actions';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import STDFData from '../components/STDFData';
import Row from '../components/Utilities/Row';
import CollapsePanel from '../components/Utilities/CollapsePanel';
import Pagination from '../components/Utilities/Pagination';


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
      query: {
        lot_id,
        sort_type,
        sort_col,
        platform,
        err_code,
        wrn_code,
        date_range,
      },
      page,
      page: {
        per_page
      },
    } = this.props;

    const params = {
      lotId: lot_id,
      sortType: sort_type,
      colToSort: sort_col,
      errCode: err_code,
      wrnCode: wrn_code,
      startDate: date_range[0],
      endDate: date_range[1],
      page: page,
      perPage: per_page,
      platform,
    };

    axios('/gatekeeper/api/search', {params}).then(this.updateSTDFLogs);
  }

  updateSTDFLogs = ({data}) => {
    // format data
    if(data === undefined) return false;

    const stdfLogs = map(data.data, (result) => {
      const log = result;

      log.file_size = parseInt(log.file_size, 10) * 0.001;
      log.file_size = log.file_size.toLocaleString();
      log.file_size += 'kb';
      log.transfer_time = log.transfer_time;
      log.transfer_time += 's';
      log.parse_time = log.parse_time;
      log.parse_time += 's';

      return log;
    });

    this.props.setSTDFLogs(stdfLogs);
  }
  
  render() {
    return (
      <div>
        <Filter />
        <Row width={10} offset={1}>
          <CollapsePanel title="LOGS" isCollapse>
            <STDFData />
            <hr />
            <Pagination pagination={this.props.page} onPageChange={this.updateSTDFLogs} />
          </CollapsePanel>
        </Row>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ page, query }) => ({ page, query });

  export default connect(mapStateToProps, { setSTDFLogs, updatePagination })(HomePage);
