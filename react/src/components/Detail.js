import React, { Component, Fragment } from 'react'

import { formatDate, formatStatus } from '../utils/formatters'

// import { getContracts, parseContract } from './EscrowList'
import './Detail.css'

const ActionTypes = ['deposit', 'send product', 'approve', 'cancel', 'withdraw', 'refund']

const DUMMY = {
  id: 1,
  createdAt: new Date(),
  status: 1,
  balance: 1,
  buyer: '0x53edeaae2583767e76d245b0249d90ecbdd1aa94',
  seller: '0x4f46df0df83f53b6678b88aa3e896a48100afdee',
}

class Detail extends Component {
  state = {
    id: '',
  }

  componentDidMount() {
    const { address, contract } = this.props
    this.setState({ id: this.props.match.params.id })
    this.getIdentity(address)
  }

  getIdentity = address => {
    // buyer address == current address -> buyer
    // seller address == current address -> seller
    // not match -> no body
  }

  handleClick = action => {
    // action에 따른 action
  }

  render() {
    const escrow = this.props.escrows || DUMMY

    return (
      <div className="Detail container">
        {escrow && (
          <Fragment>
            <h2>
              Escrow Detail <small>{this.state.id}</small>
            </h2>
            <br />
            <div className="Detail__content">
              <table>
                <thead>
                  <tr>
                    <th>Contract #</th>
                    <th>Date</th>
                    <th>buyer</th>
                    <th>seller</th>
                    <th>Status</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{escrow.id}</td>
                    <td>{formatDate(escrow.createdAt)}</td>
                    <td>{escrow.buyer}</td>
                    <td>{escrow.seller}</td>
                    <td>{formatStatus(escrow.status)}</td>
                    <td>{escrow.balance} ether</td>
                  </tr>
                </tbody>
              </table>
              {ActionTypes.map(action => (
                <button
                  key={action}
                  className="button button-outline"
                  onClick={this.handleClick(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default Detail
