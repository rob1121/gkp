import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import {SEARCH_LOT_URL} from '../../constants';

export default class Typeahead extends React.Component {
  state = {
    options: [],
  };

  shouldComponentUpdate = (nextProps, nextState) => JSON.stringify(nextState.options) !== JSON.stringify(this.state.options)
  
  onSearch = q => axios(`${SEARCH_LOT_URL}?q=${q}`).then(this.updateLostList);

  updateLostList = lots => this.setState({ options: lots.data })

  render() {
    return (
      <div className="field typeahead-container">
        <p className="help is-default">LOT_ID</p>
        <AsyncTypeahead
          className="input is-small "
          clearButton
          onSearch={this.onSearch}
          onChange={this.props.onChange}
          options={this.state.options}
          defaultValue=""
        />
      </div>
    );
  }
}
