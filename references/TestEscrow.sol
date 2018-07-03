pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Escrow.sol";

contract TestEscrow {
  function testCreateEscrow() public {
    address deployed = DeployedAddresses.Escrow();
    Escrow escrow = Escrow(deployed);

    Assert.equal(escrow.createdBy, deployed, "CreatedBy");
  }

  function testSetBuyer() public {
    address deployed = DeployedAddresses.Escrow();
    Escrow escrow = Escrow(deployed);
    escrow.setBuyer(deployed);

    Assert.equal(escrow.buyer, deployed, "Buyer");
  }

  /* function testInitialBalanceUsingDeployedContract() public {
    Escrow escrow = Escrow(DeployedAddresses.Escrow());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  } */
}
