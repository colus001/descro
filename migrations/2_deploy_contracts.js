var Descro = artifacts.require("./Descro.sol");
// var TheContract = artifacts.require("./TheContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Descro);

  // if (TheContract) {
  //   deployer.deploy(TheContract);
  // }
};
