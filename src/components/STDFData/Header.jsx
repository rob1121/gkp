import React, { Component } from 'react';
import {connect} from 'react-redux';
import { map, kebabCase, toUpper } from 'lodash';
import {updateQuery} from '../../actions';

class Header extends Component {
  /**
 * set sort type
 */
  sortType = sort_col => {
    return this.props.query.sort_col === sort_col ? 1 : 0;
  }

  render() {
    const { updateQuery, home_filter: {columns}, query: {sort_type} } = this.props;
    const thIcon = sort_type ? 'fa fa-sort-desc' : 'fa fa-sort-asc';

    const header = map(columns, (sort_col, key) => (
      <th 
        className={kebabCase(sort_col)} 
        key={key} 
        onClick={() => updateQuery({ sort_col })}
      >
        <span>
          {toUpper(sort_col)}{' '}
        </span>
        <span 
          className="icon is-small" 
          style={{ display: this.sortType(sort_col) ? 'inline' : 'none' }}
        >
          <i className={thIcon} />
        </span>
      </th>
    ));

    return (
      <thead>
        <tr>
          {header}
        </tr>
      </thead>
    );
  }
}

const mapStateToProps = ({query, home_filter }) => ({query, home_filter });

export default connect(mapStateToProps, {updateQuery})(Header);
