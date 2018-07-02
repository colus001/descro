pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Descro.sol";

contract TestDescro {
  function testOwner() public {
    Descro descro = Descro(DeployedAddresses.Descro());
    Assert.equal(descro.owner(), msg.sender, "An owner is different than a deployer");
  }

  function testFeeSetup() public {
    Descro descro = Descro(DeployedAddresses.Descro());

    uint fee = descro.calculateFee(0.001 ether);
    uint expected = 0.0001 ether;
    Assert.isAtLeast(fee, expected, "Default fee is not setup properly");
  }
}
