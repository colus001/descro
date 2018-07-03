pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./Math.sol";

contract Fee is Ownable {
  using SafeMath for uint256;

  uint public feeRate = 1000; // 1/1000
  uint public minFee = 0.0001 ether;
  uint public maxFee = 1 ether;

  /* Modifiers */
  modifier moreThanFee() {
    require(msg.value > minFee);
    _;
  }

  /* Fee */
  function setFeeRate(uint _feeRate) external onlyOwner {
    require(_feeRate > 1);
    feeRate = _feeRate;
  }

  function setMinFee(uint _minFee) external onlyOwner {
    require(_minFee < maxFee);
    minFee = _minFee;
  }

  function setMaxFee(uint _maxFee) external onlyOwner {
    require(_maxFee > minFee);
    maxFee = _maxFee;
  }

  function calculateFee(uint _balance) public view returns (uint) {
    uint ratioFee = _balance.div(feeRate);
    return Math.min(maxFee, Math.max(ratioFee, minFee));
  }
}
