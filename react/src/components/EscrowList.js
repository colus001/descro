import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Activity from './Activity'

const getContracts = (contract) => (escrowsId) => Promise.all(
  escrowsId.map((rawId) => {
    const id = rawId.toNumber()
    return contract.escrows.call(id).then(escrow => ([...escrow, id]))
  })
)

const parseContract = (escrow) => ({
  id: escrow[escrow.length - 1],
  createdAt: escrow[0].toNumber() * 1000,
  buyer: escrow[1],
  seller: escrow[2],
  balance: escrow[3].toNumber(),
  status: escrow[4].toNumber(),
})

class EscrowList extends Component {
  componentDidMount() {
    const { address, contract } = this.props
    if (!address) return

    Promise
      .all([
        contract
          .getEscrowsByBuyer(address)
          .then(getContracts(contract))
          .then((escrows) => escrows.map(parseContract)),
        contract
          .getEscrowsBySeller(address)
          .then(getContracts(contract))
          .then((escrows) => escrows.map(parseContract))
      ])
      .then(([buyers, sellers]) => this.props.setEscrows(buyers, sellers))
  }

  render() {
    if (!this.props.address) {
      return (
        <Redirect to="/" />
      )
    }

    const { escrows } = this.props

    return (
      <div className="EscrowList">
        <h3>As Buyer</h3>
        <Activity escrows={escrows.asBuyer} />

        <h3>As Seller</h3>
        <Activity escrows={escrows.asSeller} />
      </div>
    )
  }
}

export default EscrowList
