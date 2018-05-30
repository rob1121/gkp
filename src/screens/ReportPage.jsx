import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { setPagination } from '../actions';

const mapStateToProps = ({ page }) => ({ page });


class ReportPage extends Component {
  render() {
    return (
      <div>
        hello {this.props.match.params.name}
      </div>
    )
  }
}

export default connect(mapStateToProps, { setPagination })(ReportPage);
