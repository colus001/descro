import { connect } from 'react-redux'

import Header from '../components/Header'

import { setBalance, clearWallet } from '../state/actions/wallet'

const mapStateToProps = (state) => ({
  contract: state.contract,
  address: state.wallet.address,
  balance: state.wallet.balance,
})

const mapDispatchToProps = (dispatch) => ({
  clearWallet: () => dispatch(clearWallet(null)),
  setBalance: (balance) => dispatch(setBalance(balance)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
