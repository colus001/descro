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
      <table>
        <thead>
          <tr>
            <th>Contract #</th>
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
                <strong>Buyer</strong> {escrow.buyer}
                <br />
                <strong>Seller</strong> {escrow.seller}
                <br />
                <strong>Expired At</strong> {formatDate(addDays(escrow.createdAt, 14))}
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
