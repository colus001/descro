import React, { Component } from 'react'

import { formatDate, formatStatus } from '../utils/formatters'
import history from '../history'

import './Activity.css'

const DUMMY = [{
  id: 1,
  createdAt: new Date(),
  status: 1,
  description: 'Akron, OH',
  balance: 1,
  fee: 0.01,
}, {
  id: 2,
  createdAt: new Date(),
  status: 3,
  description: 'Akron, OH',
  balance: 10,
  fee: 0.01,
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
            <th>Description</th>
            <th>Balance</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {escrows.map((escrow) => (
            <tr className="Activity__link" key={escrow.id} onClick={this.onClickRow(escrow.id)}>
              <td>{escrow.id}</td>
              <td>{formatDate(escrow.createdAt)}</td>
              <td>{formatStatus(escrow.status)}</td>
              <td>{escrow.description}</td>
              <td>{escrow.balance}</td>
              <td>{escrow.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Activity
