import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Modal from './Modal';
import './Header.css';

class Header extends Component {
	state = {
    isShow: false,
    searchAddress: '',
		startAddress: '',
	}

	componentDidMount(){
    // console.log(this.props);
    // this.props.contract.getBalanceByEscrowId.call(0, {
    //   from: fromAccount,
    //   gas: gasLimit,
    //   gasPrice: gasPriceInWei
    // });
	}

	handleModal = (show) => () => {
		const {startAddress} = this.state;
		this.setState({
			isShow: show,
			...show ? {} : {startAddress: ''}
		}, () => {
			console.log(startAddress);
		})
	}

	handleChangeInput = (name) => (e) => {
		this.setState({
			[name]: e.target.value,
		})
  }
  
  createEscrow = () => {
    console.log(this.props);
  }

	render() {
		const { isShow, startAddress, searchAddress } = this.state;

		return (
			[<div className="header" key="header">
				<div className='container'>
					<div className="header--top">
						<Link to="/" className="header--logo">DESCRO</Link>
						<div className="header--search">
							<input type="text" className='header--search-input' placeholder="Search for a deal" value={searchAddress} onChange={this.handleChangeInput('searchAddress')} />
						</div>
						<div className="header--address">My Account</div>
					</div>
					<div className="header--bottom">
						<div className="balance-wrap">
							<span className="balance-name">BALANCE</span>
							<div className="balance-value">
								<span className="balance-value--val">153</span>
								<span className="balance-value--unit">ETH</span>
							</div>
						</div>
						<div className="header--action">
							<div className="header--intro">
								<div className="intro-title">DESCRO</div>
								<div className="intro-body">Decentralized Escrow for Ethereum</div>
							</div>
							<button className="btn" onClick={this.handleModal(true)}>Start Deal</button>
						</div>
					</div>
				</div>
			</div>,
			<Modal key='modal' isShow={isShow} hideModal={this.handleModal(false)}>
				Start Deal Modal
				<div>
					<label htmlFor="buyerAddress">Seller Address</label>
					<input type='text' id="buyerAddress" value={startAddress} onChange={this.handleChangeInput('startAddress')} />
				</div>
					<div>
						<button className="btn" onClick={this.handleModal(false)}>Cancel</button>
						<button className="btn" onClick={this.createEscrow}>Confirm</button>
					</div>
			</Modal>
				]
			);
		}
	}

	export default Header;
