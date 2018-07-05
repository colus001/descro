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
