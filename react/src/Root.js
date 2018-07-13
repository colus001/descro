import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

import { getWeb3, getDescro } from './utils/ethereum'

import 'milligram/dist/milligram.css'

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
          Loading... descro contract...
        </h3>
      )
    }

    return (
      <BrowserRouter>
        <App descro={this.descro} />
      </BrowserRouter>
    );
  }
}

export default Root
