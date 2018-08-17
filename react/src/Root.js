import React, { Component } from 'react'
import { Router as BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setContract } from './state/actions/contract'
import App from './components/App'
import history from './history'

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
      .then(this.props.setContract)
  }

  render() {
    if (!this.props.contract) {
      return (
        <div className="loading">
          <h3>Loading... descro contract...</h3>
        </div>
      )
    }

    return (
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  contract: state.contract,
})

const mapDispatchToProps = (dispatch) => ({
  setContract: (contract) => dispatch(setContract(contract)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root)
