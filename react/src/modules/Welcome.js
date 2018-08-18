import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { validate } from 'wallet-address-validator'

import { getWeb3 } from '../utils/ethereum'
import { setWalletAddress } from '../state/actions/wallet'

import './Welcome.css'

class Welcome extends Component {
  state = {
    address: ''
  }

  handleSubmit = () => {
    const { address } = this.state

    if (!address || address.length === 0) {
      alert('You are not ready to submit!')
      return
    }

    if (!validate(address, 'ETH')) {
      alert('You have entered wrong ethereum address')
      return
    }

    this.props.setWalletAddress(address)
  }

  handleChangeAddress = (evt) => {
    this.setState({
      address: evt.target.value,
    })
  }

  handleMetaMaskLogin = () => {
    getWeb3()
      .then((instance) => instance.eth.getAccounts())
      .then((addresses) => {
        const [address] = addresses
        if (!address) return
        this.props.setWalletAddress(address)
      })
  }

  render() {
    if (this.props.address) {
      return (
        <Redirect to="/activity" />
      )
    }

    return (
      <div className="Welcome">
        <div>
          <button
            type="button"
            onClick={this.handleMetaMaskLogin}
          >
            Login with MetaMask
            {' '}
            <i className="fab fa-lg fa-firefox" />
          </button>
        </div>

        <hr />

        <input
          id="address"
          type="text"
          placeholder="Enter your ethereum address"
          onChange={this.handleChangeAddress}
        />

        <button type="button" onClick={this.handleSubmit}>
          Login with Address
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  address: state.wallet.address,
})

const mapDispatchToProps = (dispatch) => ({
  setWalletAddress: address => dispatch(setWalletAddress(address))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome)
