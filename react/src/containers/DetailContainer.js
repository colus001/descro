import { connect } from 'react-redux'

import Detail from '../components/Detail'

const mapStateToProps = state => ({
  contract: state.contract,
  address: state.wallet.address,
  balance: state.wallet.balance,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
