import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setContract } from './state/actions/contract'
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
      .then(this.props.setContract)
  }

  render() {
    if (!this.props.contract) {
      return (
        <h3>
          Loading... descro contract...
        </h3>
      )
    }

    return (
      <BrowserRouter>
        <App {...this.props} />
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
