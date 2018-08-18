import { range, max } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Activity from '../components/Activity'
import { getContracts, parseContract } from '../components/EscrowList'

class LatestEscrows extends Component {
  state = {
    escrows: [],
  }

  componentDidMount() {
    this.props.contract
      .totalEscrowsCount()
      .then(count => count.toNumber())
      .then((count) => {
        const ids = range(count - 1, max([-1, count - 10]), -1)
        return getContracts(this.props.contract)(ids)
      })
      .then((escrows) => escrows.map(parseContract))
      .then((escrows) => this.setState({ escrows }))
  }

  render() {
    return (
      <div>
        <h3>Latest Activity at descro</h3>
        <Activity escrows={this.state.escrows} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  contract: state.contract,
})

export default connect(
  mapStateToProps,
)(LatestEscrows)
