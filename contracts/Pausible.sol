pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Pausible is Ownable {
  bool public isPaused = false;

  modifier onlyPaused() {
    require(isPaused);
    _;
  }

  modifier onlyInService() {
    require(!isPaused);
    _;
  }

  function pause() public onlyInService onlyOwner {
    isPaused = true;
  }

  function unpause() public onlyPaused onlyOwner {
    isPaused = false;
  }
}
