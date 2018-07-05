import React, { Component } from 'react';

import App from './App'

import { getWeb3, getDescro } from './utils/ethereum'

class Root extends Component {
  descro = null

  state = {
    isIntiated: false,
  }

  componentDidMount() {
    getWeb3()
      .then(getDescro)
      .then((descro) => {
        this.descro = descro
        this.setState({ isIntiated: true })
      })
  }

  render() {
    if (!this.state.isIntiated) {
      return (
        <h3>
          Loading Descro Contract
        </h3>
      )
    }

    return (
      <App />
    );
  }
}

export default Root
