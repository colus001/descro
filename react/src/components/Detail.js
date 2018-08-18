import React, { Component, Fragment } from 'react'

import { formatDate, formatStatus } from '../utils/formatters'

import { parseContract } from './EscrowList'
import history from '../history'
import './Detail.css'

const ActionTypes = [
  {
    name: 'deposit',
    status: 1, // DEPOSITED
    show: 'all',
    payable: true,
  },
  {
    name: 'send product',
    status: 1, // DEPOSITED
    show: 'seller',
    payable: false,
  },
  {
    name: 'approve',
    status: 2, // PRODUCT_SENT
    show: 'buyer',
    payable: false,
  },
  {
    name: 'cancel',
    status: 2, // PRODUCT_SENT
    show: 'all',
    payable: false,
  },
  {
    name: 'withdraw',
    status: 3, // APPROVED
    show: 'seller',
    payable: false,
  },
  {
    name: 'refund',
    status: 3, // APPROVED
    show: 'buyer',
    payable: false,
  },
]

class Detail extends Component {
  state = {
    id: '',
    escrow: {}
  }

  componentDidMount() {
    const { address, match } = this.props
    
    if (!match.params.id) {
      history.push('/')
      return
    }

    this.getDetailData(match.params.id)
    this.getIdentity(address)
  }

  getDetailData(id) {
    const { contract } = this.props

    contract && contract.escrows && contract.escrows.call(id).then(escrow => {
      this.setState({
        id,
        escrow: parseContract(escrow)
      })
    })
  }

  getIdentity = address => {
    // buyer address == current address -> buyer
    // seller address == current address -> seller
    // not match -> no body
  }

  handleClick = action => () => {
    // action에 따른 action

    // const { contract } = this.props
    // switch (action) {
    //   case 'deposit':
    //     this.props.contract
    //       .createNewEscrow
    //       .sendTransaction(startAddress, { from: this.props.address, value: etherToWei(buyerValue) })
    //       .then((result) => {
            
    //       }, (err) => {
    //         err && console.error(err)
    //       })    
    //     break
    // }
  }

  render() {
    const { escrow, id } = this.state
    const { address } = this.props
    const isBuyer = escrow.buyer && new RegExp(address, 'i').test(escrow.buyer)
    const isSeller = escrow.seller && new RegExp(address, 'i').test(escrow.seller)

    return (
      <div className="Detail container">
        {escrow && (
          <Fragment>
            <h2>
              Escrow Detail <small>{id}</small>
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
                    <td>{id}</td>
                    <td>{formatDate(escrow.createdAt)}</td>
                    <td>{escrow.buyer}</td>
                    <td>{escrow.seller}</td>
                    <td>{formatStatus(escrow.status)}</td>
                    <td>{escrow.balance} ether</td>
                  </tr>
                </tbody>
              </table>

              {
                ActionTypes.map(action => {
                  let show = true
                  switch (action.show) {
                    case 'seller':
                      show = isSeller
                      break;
                    case 'buyer':
                      show = isBuyer
                      break;
                  }

                  return action.status === escrow.status && show ? (
                    <button
                      key={action.name}
                      className="button button-outline"
                      onClick={this.handleClick(action)}
                    >
                      {action.name}
                    </button>
                  ) : ''})
              }
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default Detail
