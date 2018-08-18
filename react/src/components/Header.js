import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { validate } from 'wallet-address-validator'

import Container from './Container'
import Modal from './Modal'
import BalanceContainer from '../containers/BalanceContainer'

import history from '../history'
import { etherToWei } from '../utils/ethereum'

import './Header.css'

class Header extends Component {
  state = {
    isShow: false,
    searchAddress: '',
    startAddress: '',
    buyerValue: ''
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

  handelKeyupSearch = (e) => {
    if (/Enter/.test(e.key)) {
      this.handleSearch()
    }
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

    history.push({
      pathname: '/escrows',
      id: searchAddress,
    })

    this.setState({
      searchAddress: ''
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

    if (!/^[0-9.]+$/.test(buyerValue)) {
      alert('please insert value only number')
      return
    }

    this.props.contract
      .createNewEscrow
      .sendTransaction(startAddress, { from: this.props.address, value: etherToWei(buyerValue) })
      .then((contract) => {
        if (!contract) return

        alert('The escrow was successfully created.')

        this.setState({
          isShow: false,
          startAddress: '',
          buyerValue: '',
        })
      })
      .catch(console.error)
  }

  handleLogout = () => {
    this.props.clearWallet()
    history.push('/')
  }

  render() {
    const {isShow, startAddress, searchAddress, buyerValue} = this.state
    const {address} = this.props

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
                  onKeyPress={this.handelKeyupSearch}
								/>
                <i className="fas fa-search header--search-icon" onClick={this.handleSearch} />
	            </div>
							<div className="header--address">
								{this.props.address ? (
									<Fragment>
										<Link to={{ pathname: '/escrows', id: address }}><button>My Account</button></Link>
										<button onClick={this.handleLogout}>Logout</button>
									</Fragment>
								) : (
									<Link to="/">Login</Link>
								)}
							</div>
	          </div>
	          <div className="header--bottom">
              <BalanceContainer />
              <div className="header--action">
                <div className="header--intro">
                  <div className="intro-title">DESCRO</div>
                  <div className="intro-body">Decentralized Escrow for Ethereum</div>
                </div>
                <button className="btn" onClick={this.handleModal(true)}>Create Escrow</button>
              </div>
            </div>
	        </Container>
	      </div>
	      <Modal isShow={isShow} hideModal={this.handleModal(false)} showBtns={true} confirmFunc={this.createEscrow}>
	        <h3>Create New Escrow</h3>

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

          <hr />
	      </Modal>
	    </Fragment>
		)
  }
}

export default Header
