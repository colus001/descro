import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className='container'>
					<div className="header--top">
						<div className="header--logo">DESCRO</div>
						<div className="header--search">
							<input type="text" className='header--search-input' placeholder="Search for a deal" />
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
							<button className="btn">Start Deal</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
