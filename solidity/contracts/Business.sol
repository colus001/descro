pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./Fee.sol";

contract Business is Fee {
  using SafeMath for uint256;

  /* Business */
  function getBalance() external view onlyOwner returns (uint) {
    return address(this).balance;
  }

  function collect() external onlyOwner {
    owner.transfer(address(this).balance);
  }
}
