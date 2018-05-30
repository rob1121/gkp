import React, { Component } from 'react';
import axios from 'axios';
import {SUBSCRIPTION_URL} from '../../constants';
import SubscriptionComponent from './SubscriptionComponent';

export default class Subscribe extends Component {
  state = {
    email: '',
    error: '',
    isLoading: 0,
  }

  updateEmail = email => this.setState({ ...this.state, email })

  subscribe = () => {
    const { email } = this.state;
    const userInput = new FormData();

    userInput.append('email', email);
    this.setState({ ...this.state, isLoading: 1 });

    axios.post(SUBSCRIPTION_URL, userInput)
        .then(this.subscripttionSuccess)
        .catch(this.errorHandler)
      ;
  }

  subscripttionSuccess = ({ data }) => {
    this.setState({
      ...this.state,
      error: '',
      email: '',
      isLoading: 0,
    });

    alert(data);
  }

  errorHandler = ({ response }) => {
    const error = response.data;

    this.setState({
      ...this.state,
      error: error.message,
      isLoading: 0,
    });
  }

  render() {
    return <SubscriptionComponent
      {...this.state}
      subscribe={this.subscribe}
      updateEmail={this.updateEmail}
    />
  }
}
