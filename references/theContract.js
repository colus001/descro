var TheContract = artifacts.require('./TheContract.sol');

contract('TheContract', function (accounts) {
  const tester = accounts[0];

  it('should create new objects by tester', function() {
    let theContract;

    return TheContract.deployed()
      .then((instance) => {
        theContract = instance;

        // console.log(theContract.createNewObject)
        return theContract.createNewObject.sendTransaction(tester, 1, { from: tester })
      })
      .then(() => {
        return theContract.createNewObject.sendTransaction(tester, 2, { from: tester })
      })
      .then(() => {
        return theContract.getObjectsCountByOwner.call(tester)
      })
      .then((count) => {
        assert.equal(count.toNumber(), 2, 'Object count hasn\'t set properly')
      })
  })
})
