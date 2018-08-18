import { connect } from 'react-redux'

import EscrowList from '../components/EscrowList'

import { setEscrows } from '../state/actions/escrows'

const mapStateToProps = (state) => ({
  contract: state.contract,
  escrows: state.escrows,
})

const mapDispatchToProps = (dispatch) => ({
  setEscrows: (asBuyer, asSeller) => dispatch(setEscrows(asBuyer, asSeller))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EscrowList)
