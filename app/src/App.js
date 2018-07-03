import React, { Component } from 'react';
import contract from 'truffle-contract'

import getWeb3 from './utils/getWeb3'
import DescroContract from './build/contracts/Descro.json'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  descro = null

  componentDidMount() {
    getWeb3().then(this.instantiate)
  }

  instantiate = (web3) => {
    const descroContract = contract(DescroContract)
    descroContract.setProvider(web3.currentProvider)
    if (typeof descroContract.currentProvider.sendAsync !== 'function') {
      descroContract.currentProvider.sendAsync = function() {
        return descroContract.currentProvider.send.apply(descroContract.currentProvider, arguments)
      }
    }

    web3.eth.getAccounts((error, accounts) => {
      const owner = accounts[0]
      const buyer = accounts[5]
      const seller = accounts[6]

      descroContract.deployed()
        .then((instance) => {
          this.descro = instance
          console.info('descro contract initiation completed')
        })
        // .then(() => this.descro.createNewEscrow.estimateGas(buyer, seller, { from: buyer }))
        // .then((gas) => this.descro.createNewEscrow.sendTransaction(buyer, seller, { from: buyer, gas }))
        // .then(() => this.descro.getEscrowsByBuyer.call(buyer))
        // .then((escrowIds) => this.descro.escrows.call(escrowIds[0]))
        // .then((escrow) => console.log({ escrow }))
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
