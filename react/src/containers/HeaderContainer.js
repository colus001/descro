import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'

import { setWalletAddress } from '../state/actions/wallet'

const mapStateToProps = (state) => ({
  address: state.wallet.address,
})

const mapDispatchToProps = (dispatch) => ({
  removeWalletAddress: () => dispatch(setWalletAddress(null)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
