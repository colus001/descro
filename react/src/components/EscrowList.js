import React, { Component } from 'react'
import history from '../history'

import { weiToEther } from '../utils/ethereum'

import Activity from './Activity'

export const getContracts = (contract) => (escrowsId) => Promise.all(
  escrowsId.map((rawId) => {
    const id = typeof rawId === 'number' ? rawId : rawId.toNumber()
    return contract.escrows.call(id).then(escrow => ([...escrow, id]))
  })
)

export const parseContract = (escrow) => ({
  id: escrow[escrow.length - 1],
  createdAt: escrow[0].toNumber() * 1000,
  buyer: escrow[1],
  seller: escrow[2],
  balance: weiToEther(escrow[3].toNumber()),
  status: escrow[4].toNumber(),
})

class EscrowList extends Component {
  componentDidMount() {
    const { location } = this.props
    const address = location.id;

    if (!address) {
      history.push('/')
    } else {
      this.getAllEscrows(address)
    }
  }

  getAllEscrows(address) {
    const { contract } = this.props

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

  componentWillReceiveProps(nextProps) {
		if (this.props.location.id !== nextProps.location.id) {
			this.getAllEscrows(nextProps.location.id)
		}
	}

  render() {
    const { escrows } = this.props

    if (escrows.asBuyer.length === 0 && escrows.asSeller.length === 0) {
      return (
        <h3>There is no result</h3>
      )
    }

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
