import React, { Component, Fragment } from 'react'

import { formatDate, formatStatus, STATUS } from '../utils/formatters'
import { loadingTime } from '../settings'
import { parseContract } from './EscrowList'
import { etherToWei, getWeb3, weiToEther } from '../utils/ethereum'

import Badge from '../components/Badge'
import Modal from './Modal'
import Loading from './Loading'
import history from '../history'

import './Detail.css'

const ActionTypes = [
  {
    name: 'deposit',
    status: STATUS.DEPOSITED,
    show: 'buyer',
    payable: true,
  },
  {
    name: 'send product',
    status: STATUS.DEPOSITED,
    show: 'seller',
    payable: false,
  },
  {
    name: 'approve',
    status: STATUS.PRODUCT_SENT,
    show: 'buyer',
    payable: false,
  },
  {
    name: 'cancel',
    status: STATUS.DEPOSITED,
    show: 'all',
    payable: false,
  },
  {
    name: 'withdraw',
    status: STATUS.APPROVED,
    show: 'seller',
    payable: false,
  },
  {
    name: 'refund',
    status: STATUS.CANCELLED,
    show: 'buyer',
    payable: false,
  },
]

class Detail extends Component {
  state = {
    id: '',
    escrow: {},
    showModal: false,
    isLoading: false,
    balanceValue: ''
  }

  componentDidMount() {
    const { match } = this.props

    if (!match.params.id) {
      history.push('/')
      return
    }

    this.setState({
      id: match.params.id
    }, () => {
      this.getDetailData()
    })
  }

  getDetailData(updateBalance) {
    const { contract } = this.props
    const { id } = this.state

    this.setState({ isLoading: true }, () => {
      contract.escrows.call(id).then(escrow => {
        this.setState({
          escrow: parseContract(escrow),
          ...updateBalance ? {} : {isLoading: false}
        })
      })

      if (updateBalance) {
        getWeb3()
          .then((instance) => instance.eth.getBalance(this.props.address))
          .then((balance) => this.props.setBalance(weiToEther(balance)))
          .then(() => this.setState({ isLoading: false }))
      }
    })
  }

  handleContractAction = actionName => () => {
    switch (actionName) {
      case 'deposit':
        this.handleModal(true)
        this.handleModalConfirm = () => {
          const { balanceValue } = this.state

          if (!balanceValue) {
            alert('Balance is required')
            return
          }

          if (!/^[0-9.]+$/.test(balanceValue)) {
            alert('Please insert only number')
            return
          }

          this.contractFunc('deposit', {value: etherToWei(balanceValue)})
        }
        break
      case 'send product':
        this.contractFunc('sendProduct')
        break
      case 'approve':
      case 'cancel':
      case 'refund':
      case 'withdraw':
        this.contractFunc(actionName)
        break
    }
  }

  contractFunc(funcNs, opt) {
    if (!funcNs) return

    const { contract, address } = this.props
    const { id } = this.state

    contract
      [funcNs]
      .sendTransaction(id, { from: address, ...opt })
      .then((result) => { // success
        this.handleModal(false)
        this.setState({ isLoading: true })
        setTimeout(() => {
          this.getDetailData(true)
        }, loadingTime)
      })
      .catch(console.error)
  }

  handleModalConfirm () {}

  handleModal = (isShow, callback) => {
    this.setState({
      showModal: isShow,
      ...isShow ? {} : {balanceValue: ''}
    }, () => {
      callback && typeof callback === 'function' && callback()
    })
  }

  handleChangeInput = (name) => (e) => this.setState({[name]: e.target.value})

  render() {
    const { escrow, id, showModal, balanceValue, isLoading } = this.state
    const { address } = this.props
    const isBuyer = escrow.buyer && new RegExp(address, 'i').test(escrow.buyer)
    const isSeller = escrow.seller && new RegExp(address, 'i').test(escrow.seller)

    return (
      <Fragment>
        {isLoading && <div className='modal-bg'><Loading /></div>}
        <Modal
          isShow={showModal}
          showBtns={true}
          hideModal={() => this.handleModal(false)}
          confirmFunc={this.handleModalConfirm}
          cancelFunc={() => this.handleModal(false)}
        >
          <h3>Set a balance</h3>
          <label htmlFor="balanceValue">
            Balance
          </label>
          <input
            type="text"
            id="balanceValue"
            placeholder="Enter balance"
            value={balanceValue}
            onChange={this.handleChangeInput('balanceValue')}
          />
        </Modal>
        <div className="Detail container">
          {escrow && (
            <Fragment>
              <h2>
                Escrow Detail <small>{id}</small>
                <div>
                  <i className="fas fa-sync Balance__sync" onClick={() => this.getDetailData()} />
                </div>
                <br/>
                {isBuyer && <div>BUYER <i className="fas fa-wallet" /></div>}
                {isSeller && <div>SELLER<i className="fas fa-suitcase-rolling" /></div>}
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
                      <td><div><Badge status={escrow.status} showIcon /></div></td>
                      <td>{escrow.balance} ether</td>
                    </tr>
                  </tbody>
                </table>

                {
                  ActionTypes.map(action => {
                    let show = true
                    action.show === 'seller' && (show = isSeller)
                    action.show === 'buyer' && (show = isBuyer)

                    return (action.status === escrow.status) && show ? (
                      <button
                        key={action.name}
                        className="button button-outline"
                        onClick={this.handleContractAction(action.name)}
                      >
                        {action.name}
                      </button>
                    ) : ''})
                }
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }
}

export default Detail
