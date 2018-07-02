pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Descro.sol";

contract TestDescro {
  function testFeeSetup() public {
    Descro descro = Descro(DeployedAddresses.Descro());

    uint fee = descro.calculateFee(0);
    uint expected = 0.0001 ether;
    Assert.isAtLeast(fee, expected, "Default fee is not setup properly");

    /* descro.setMinFee(0.001 ether);
    uint newFee = descro.fee();
    uint newExpected = 0.001 ether;
    Assert.equal(newFee, newExpected, "Error occurs while setFee"); */

    /* uint balance = descro.getBalance();
    uint expectedBalance = 0.0001 ether;
    Assert.isAtLeast(balance, expectedBalance, "No balance found"); */
  }
}
