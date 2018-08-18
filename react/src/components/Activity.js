import React, { Component } from 'react'
import { addDays } from 'date-fns'

import { formatDate, formatStatus } from '../utils/formatters'
import history from '../history'

import './Activity.css'

class Activity extends Component {
  onClickRow = (id) => () => {
    history.push(`/escrows/${id}`)
  }

  render() {
    const { escrows } = this.props

    return (
      <table className="Activity">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Detail</th>
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
                <td className="Activity__td">
                  <strong>Buyer</strong> {escrow.buyer}
                </td>
                <td className="Activity__td">
                  <strong>Seller</strong> {escrow.seller}
                </td>
                <td className="Activity__td">
                  <strong>Expired</strong> {formatDate(addDays(escrow.createdAt, 14))}
                </td>
              </td>
              <td>{escrow.balance} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Activity
