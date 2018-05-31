import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import {} from '../actions';



class ReportPage extends Component {
  render() {
    return (
      <div>
        hello {this.props.match.params.name}
      </div>
    )
  }
}

const mapStateToProps = ({ page }) => ({ page });

export default connect(mapStateToProps, {})(ReportPage);
