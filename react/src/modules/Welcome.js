import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { validate } from 'wallet-address-validator'

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

  render() {
    if (this.props.address) {
      return (
        <Redirect to="/activity" />
      )
    }

    return (
      <div className="Welcome">
        <label for="address">Enter your address</label>
        <input
          id="address"
          type="text"
          placeholder="Enter your ethereum address"
          onChange={this.handleChangeAddress}
        />

        <button type="button" onClick={this.handleSubmit}>Submit</button>
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
