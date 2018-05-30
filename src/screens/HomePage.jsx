import React, { Component } from 'react';
import {connect} from 'react-redux';
import { setPagination, setQuery, setSTDFLogs } from '../actions';
import Footer from '../components/Footer';
import Footer from '../components/Filter';


class HomePage extends Component {
  state = {
    isLoading: false,
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

const mapStateToProps = ({ page, stdf_logs }) => ({ page, stdf_logs });

export default connect(mapStateToProps, { setPagination, setQuery, setSTDFLogs })(HomePage);
