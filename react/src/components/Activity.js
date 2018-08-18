import React, { Component } from 'react'

import { formatDate, formatStatus } from '../utils/formatters'
import history from '../history'

import './Activity.css'

const DUMMY = [{
  id: 1,
  createdAt: new Date(),
  status: 1,
  balance: 1,
  buyer: '0x53edeaae2583767e76d245b0249d90ecbdd1aa94',
  seller: '0x4f46df0df83f53b6678b88aa3e896a48100afdee',
}, {
  id: 2,
  createdAt: new Date(),
  status: 3,
  balance: 10,
  buyer: '0x53edeaae2583767e76d245b0249d90ecbdd1aa94',
  seller: '0x4f46df0df83f53b6678b88aa3e896a48100afdee',
}]

class Activity extends Component {
  onClickRow = (id) => () => {
    history.push(`/escrows/${id}`)
  }

  render() {
    const escrows = this.props.escrows || DUMMY

    return (
      <table>
        <thead>
          <tr>
            <th>Contract #</th>
            <th>Date</th>
            <th>Status</th>
            <th>Accounts</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {escrows.map((escrow) => (
            <tr className="Activity__link" key={escrow.id} onClick={this.onClickRow(escrow.id)}>
              <td>{escrow.id}</td>
              <td>{formatDate(escrow.createdAt)}</td>
              <td>{formatStatus(escrow.status)}</td>
              <td>
                <strong>Buyer</strong> {escrow.buyer}
                <br />
                <strong>Seller</strong> {escrow.seller}
              </td>
              <td>{escrow.balance} ether</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Activity
