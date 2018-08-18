import { connect } from 'react-redux'

import Balance from '../components/Balance'

import { setBalance, clearWallet } from '../state/actions/wallet'

const mapStateToProps = (state) => ({
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
)(Balance)
