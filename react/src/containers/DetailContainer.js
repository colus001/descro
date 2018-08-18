import { connect } from 'react-redux'

import Detail from '../components/Detail'

import { setBalance } from '../state/actions/wallet'

const mapStateToProps = state => ({
  contract: state.contract,
  address: state.wallet.address,
  balance: state.wallet.balance,
})

const mapDispatchToProps = dispatch => ({
  setBalance: (balance) => dispatch(setBalance(balance)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
