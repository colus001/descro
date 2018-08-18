import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { validate } from 'wallet-address-validator'

import Container from './Container'
import Modal from './Modal'
import Balance from './Balance'

import history from '../history'
import { getWeb3, weiToEther, etherToWei } from '../utils/ethereum'

import './Header.css'

class Header extends Component {
  state = {
    isShow: false,
    searchAddress: '',
    startAddress: '',
    buyerValue: ''
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    const { address } = this.props
    if (!address || address === prevProps.address) {
      return
    }

    getWeb3()
      .then((instance) => instance.eth.getBalance(address))
      .then((balance) => this.props.setBalance(weiToEther(balance)))
  }

  handleModal = (show) => () => {
    if (show && !this.props.address) {
      alert('please login first')
      return
    }

    this.setState({
      isShow: show,
      ...show ? {} : {startAddress: ''}
    })
  }

  handleChangeInput = (name) => (e) => {
    this.setState({[name]: e.target.value})
  }

  handleSearch = () => {
    const { searchAddress } = this.state

    if (!searchAddress || searchAddress.length === 0) {
      alert('You are not ready to search!')
      return
    }

    if (!validate(searchAddress, 'ETH')) {
      alert('You have entered wrong ethereum address')
      return
    }

    this.props.contract.getEscrowsByBuyer.call(searchAddress)
      .then((result) => {
        console.log(result);
      })

    this.props.contract.getEscrowsBySeller.call(searchAddress)
      .then((result) => {
        console.log(result);
      })
  }

  createEscrow = () => {
    const {startAddress, buyerValue} = this.state;

    if (!startAddress || startAddress.length === 0) {
      alert('You are not ready to start!')
      return
    }

    if (!validate(startAddress, 'ETH')) {
      alert('You have entered wrong ethereum address')
      return
    }

    if (!buyerValue) {
      alert('value is required')
      return
    }

    if (!/^\d+$/.test(buyerValue)) {
      alert('please insert value only number')
      return
    }

    this.props.contract
      .createNewEscrow
      .sendTransaction(startAddress, { from: this.props.address, value: etherToWei(buyerValue) })
      .then((contract) => {
        console.log(contract); // contract

        if (contract) {
          alert('The escrow was successfully created.')
          
          this.setState({
            isShow: false,
            startAddress: '',
            buyerValue: '',
          })
        }
      }, (err) => {
        err && console.error(err)
      })
  }

  handleLogout = () => {
    this.props.clearWallet()
    history.push('/')
  }

  render() {
    const {isShow, startAddress, searchAddress, buyerValue} = this.state;

    return (
			<Fragment>
	      <div className="header">
	        <Container>
	          <div className="header--top">
	            <Link to="/" className="header--logo">
								DESCRO
							</Link>
	            <div className="header--search">
	              <input
									type="text"
									className='header--search-input'
									placeholder="Search for a escrow by address"
									value={searchAddress}
									onChange={this.handleChangeInput('searchAddress')}
								/>
                <button className='btn' onClick={this.handleSearch}>Search</button>
	            </div>
							<div className="header--address">
								{this.props.address ? (
									<Fragment>
										<Link to="/escrows"><button>My Account</button></Link>
										<button onClick={this.handleLogout}>Logout</button>
									</Fragment>
								) : (
									<Link to="/">Login</Link>
								)}
							</div>
	          </div>
	          <div className="header--bottom">
              {this.props.balance && (
                <Balance balance={this.props.balance} />
              )}
              <div className="header--action">
                <div className="header--intro">
                  <div className="intro-title">DESCRO</div>
                  <div className="intro-body">Decentralized Escrow for Ethereum</div>
                </div>
                <button className="btn" onClick={this.handleModal(true)}>Start Deal</button>
              </div>
            </div>
	        </Container>
	      </div>
	      <Modal isShow={isShow} hideModal={this.handleModal(false)}>
	        <h3>Create New Escrow</h3>
	        <div>
	          <label htmlFor="buyerAddress">
              Seller Address
            </label>
	          <input
              type="text"
              id="buyerAddress"
              placeholder="Enter ethereum address of seller"
              value={startAddress}
              onChange={this.handleChangeInput('startAddress')}
            />
            <label htmlFor="buyerValue">
              Amount
            </label>
	          <input
              type="text"
              id="buyerValue"
              placeholder="Enter how much ethereum you deposit"
              value={buyerValue}
              onChange={this.handleChangeInput('buyerValue')}
            />
	        </div>
	        <div>
	          <button className="btn" onClick={this.handleModal(false)}>Cancel</button>
	          <button className="btn" onClick={this.createEscrow}>Confirm</button>
	        </div>
	      </Modal>
	    </Fragment>
		)
  }
}

export default Header
