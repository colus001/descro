import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'

import Container from './Container'
import Modal from './Modal'
import Balance from './Balance'

import history from '../history'
import { getWeb3, weiToEther } from '../utils/ethereum'

import './Header.css'

class Header extends Component {
  state = {
    isShow: false,
    searchAddress: '',
    startAddress: ''
  }

  componentDidMount() {
    // console.log(this.props);
    // this.props.contract.getBalanceByEscrowId.call(0, {
    //   from: fromAccount,
    //   gas: gasLimit,
    //   gasPrice: gasPriceInWei
    // });
  }

  componentDidUpdate(prevProps) {
    const { address } = this.props
    if (!address || address === prevProps.address) {
      return
    }

    console.log('web3');

    getWeb3()
      .then((instance) => instance.eth.getBalance(address))
      .then((balance) => this.props.setBalance(weiToEther(balance)))
  }

  handleModal = (show) => () => {
    const {startAddress} = this.state;
    this.setState({
      isShow: show,
      ...show ? {} : { startAddress: '' }
    })
  }

  handleChangeInput = (name) => (e) => {
    this.setState({[name]: e.target.value})
  }

  createEscrow = () => {
    console.log(this.props);
  }

  handleLogout = () => {
    this.props.removeWalletAddress()
    history.push('/')
  }

  render() {
    const {isShow, startAddress, searchAddress} = this.state;

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
									placeholder="Search for a deal"
									value={searchAddress}
									onChange={this.handleChangeInput('searchAddress')}
								/>
	            </div>
							<div className="header--address">
								{this.props.address ? (
									<Fragment>
										<button>My Account</button>
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
	        Start Deal Modal
	        <div>
	          <label htmlFor="buyerAddress">Seller Address</label>
	          <input type='text' id="buyerAddress" value={startAddress} onChange={this.handleChangeInput('startAddress')}/>
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
