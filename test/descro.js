var Descro = artifacts.require('./Descro.sol');

const { STATUS } = require('./constants');

const weiToEther = (wei) => web3.fromWei((typeof wei === 'number') ? wei : wei.toNumber())

const etherToWei = (ether) => web3.toWei((typeof ether === 'number') ? ether : ether.toNumber())

contract('Descro', function (accounts) {
  let descro;

  it('should create new escrow by buyer', function() {
    const buyer = accounts[3];
    const seller = accounts[4];

    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => descro.createNewEscrow.sendTransaction(buyer, seller, { from: buyer }))
      .then(() => descro.createNewEscrow.sendTransaction(buyer, seller, { from: buyer }))
      .then(() => descro.getEscrowsByBuyer.call(buyer))
      .then((escrowIds) => {
        assert.equal(escrowIds.length, 2, 'Escrow has not been created')
        return descro.getBalanceByEscrowId.call(escrowIds[0])
      })
      .then((balance) => {
        assert.equal(balance.toNumber(), 0, 'Balance is defined properly');
      })
  })

  it('should create escrow by sending ether to contract address', () => {
    const buyer = accounts[3];
    const seller = accounts[4];

    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => {
        return descro.createNewEscrowWithDeposit.sendTransaction(buyer, { from: seller, value: etherToWei(1) })
      })
      .then(() => {
        return descro.getEscrowsByBuyer.call(seller)
      })
      .then((escrowIds) => {
        assert.equal(escrowIds.length, 1, 'Escrow has not been created')
        return descro.getBalanceByEscrowId.call(escrowIds[0])
      })
      .then((balance) => {
        const eth = weiToEther(balance);
        assert.equal(eth, 1, 'Balance is not defined properly');
      })
  })

  it('should complete full scenario', () => {
    const TEST_AMOUNT = 0.5;

    const buyer = accounts[5];
    const seller = accounts[6];
    let escrowId;

    const getStatus = (id) => () => descro.escrows.call(id)
      .then((escrow) => escrow[escrow.length - 1].toNumber())

    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => descro.createNewEscrow.sendTransaction(buyer, seller, { from: buyer }))
      .then(() => descro.getEscrowsByBuyer.call(buyer))
      .then((escrowIds) => {
        assert.equal(escrowIds.length, 1, 'Escrow has not been created')
        escrowId = escrowIds[0]

        return getStatus(escrowId)()
      })
      .then((status) => {
        assert.equal(status, STATUS.CREATED, 'Failed to set status created')

        return descro.deposit
          .sendTransaction(escrowId, { from: buyer, value: etherToWei(TEST_AMOUNT) })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.DEPOSITED, 'Failed to deposit')

        return descro.getBalanceByEscrowId.call(escrowId);
      })
      .then((balance) => {
        const amount = weiToEther(balance)
        assert.equal(amount, TEST_AMOUNT, 'Balance is not defined properly')

        return descro.sendProduct
          .sendTransaction(escrowId, { from: seller })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.PRODUCT_SENT, 'Product has not been sent properly')

        return descro.approve
          .sendTransaction(escrowId, { from : buyer })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.APPROVED, 'Escrow has not been approved properly')

        return descro.withdraw
          .sendTransaction(escrowId, { from: seller })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.COMPLETED, 'Escrow has not been approved properly')
      })
  })

  it('should complete full scenario started from payable', () => {
    const TEST_AMOUNT = 0.5;

    const buyer = accounts[7];
    const seller = accounts[8];
    let escrowId;

    const getStatus = (id) => () => descro.escrows.call(id)
      .then((escrow) => escrow[escrow.length - 1].toNumber())

    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => descro.createNewEscrowWithDeposit.sendTransaction(seller, {
        from: buyer,
        value: etherToWei(TEST_AMOUNT),
      }))
      .then(() => descro.getEscrowsByBuyer.call(buyer))
      .then((escrowIds) => {
        assert.equal(escrowIds.length, 1, 'Escrow has not been created')
        escrowId = escrowIds[0]
        return descro.getBalanceByEscrowId.call(escrowId);
      })
      .then((balance) => {
        const amount = weiToEther(balance)
        assert.equal(amount, TEST_AMOUNT, 'Balance is not defined properly')

        return descro.sendProduct
          .sendTransaction(escrowId, { from: seller })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.PRODUCT_SENT, 'Product has not been sent properly')

        return descro.approve
          .sendTransaction(escrowId, { from : buyer })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.APPROVED, 'Escrow has not been approved properly')

        return descro.withdraw
          .sendTransaction(escrowId, { from: seller })
          .then(getStatus(escrowId))
      })
      .then((status) => {
        assert.equal(status, STATUS.COMPLETED, 'Escrow has not been approved properly')
      })
  })

  it('should calculate fee with given balance', () => {
    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => descro.calculateFee.call(etherToWei(10)))
      .then((fee) => {
        assert.equal(Number(weiToEther(fee)), 0.01, "Fee calculation by ratio");
      })
      .then(() => descro.calculateFee.call(etherToWei(0.01)))
      .then((fee) => {
        assert.equal(Number(weiToEther(fee)), 0.0001, "Fee calculation by fixed ether");
      })
      .then(() => descro.calculateFee.call(etherToWei(10000000)))
      .then((fee) => {
        assert.equal(Number(weiToEther(fee)), 1, "Fee calculation by max value");
      })
  })

  it('should have balance in contract address collected by escrows', () => {
    return Descro.deployed()
      .then((instance) => { descro = instance })
      .then(() => descro.getBalance.call({ from: accounts[0] }))
      .then((balance) => {
        const amount = Number(weiToEther(balance))
        assert.isAtLeast(amount, 0.0002, "Contract must have balance")
      })
  })
})
