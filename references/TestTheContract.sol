pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TheContract.sol";

contract TestTheContract {
  function testCreateNewObject() public {
    TheContract theContract = TheContract(DeployedAddresses.TheContract());

    address tester = 0x24226C148f9ac4F0B46a9eeD8a426a6D9B9794c3;

    theContract.createNewObject(tester, 1);
    theContract.createNewObject(tester, 2);
    Assert.equal(theContract.getObjectsCountByOwner(tester), 2, "Object count hasn't set properly");
  }
}
