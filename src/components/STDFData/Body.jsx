import React, { Component } from 'react';
import {connect} from 'react-redux';
import { isEmpty, size, kebabCase, map } from 'lodash';

class Body extends Component {
  toString = obj => JSON.stringify(obj);
  
  shouldComponentUpdate(nextProps) {
    return toString(nextProps) !== toString(this.props);
  }

  render() {
    const { home_filter: {columns}, stdf_log } = this.props;
    let rows = [];
    /* condition to check result stdf_log */
    if (!isEmpty(stdf_log)) {
      rows = map(stdf_log, (item, i) => {
        const td = map(columns, (col, key) => (
          <td className={kebabCase(col)} key={key}>{item[col] ? item[col] : '-'}</td>
        ));

        return (<tr key={i}>{td}</tr>);
      });
    } else {
      rows = (
        <tr>
          <td colSpan={size(columns)} className="has-text-centered">
            Sorry, no data found...
          </td>
        </tr>
      );
    }

    return (
      <tbody>{rows}</tbody>
    );
  }
}


const mapStateToProps = ({home_filter, stdf_log }) => ({home_filter, stdf_log });

export default connect(mapStateToProps, {})(Body);