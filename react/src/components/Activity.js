import React, { Component } from 'react'
import { addDays } from 'date-fns'

import Badge from '../components/Badge'
import User from '../components/User'

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
            <th>Created At</th>
            <th>Deposit</th>
            <th>Status</th>
            <th>Expired At</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {escrows.map((escrow) => (
            <tr className="Activity__link" key={escrow.id} onClick={this.onClickRow(escrow.id)}>
              <td>{escrow.id}</td>
              <td>{formatDate(escrow.createdAt)}</td>
              <td>{escrow.balance} ETH</td>
              <td><Badge status={escrow.status} showIcon /></td>
              <td>{formatDate(addDays(escrow.createdAt, 14))}</td>
              <td>
                {/* <td className="Activity__td">
                  <strong>Buyer</strong> {escrow.buyer}
                </td>
                <td className="Activity__td">
                  <strong>Seller</strong> {escrow.seller}
                </td>
                <td className="Activity__td">
                  <strong>Expired</strong> {formatDate(addDays(escrow.createdAt, 14))}
                </td>
              </td>
              <td>{escrow.balance} ETH</td> */}
                <User type="buyer" hideText />
                {' '}
                {escrow.buyer}
                <br />

                <User type="seller" hideText />
                {' '}
                {escrow.seller}
                <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Activity
