import { connect } from 'react-redux'

import Header from '../components/Header'

import { setWalletAddress, setBalance } from '../state/actions/wallet'

const mapStateToProps = (state) => ({
  address: state.wallet.address,
  balance: state.wallet.balance,
})

const mapDispatchToProps = (dispatch) => ({
  removeWalletAddress: () => dispatch(setWalletAddress(null)),
  setBalance: (balance) => dispatch(setBalance(balance)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
