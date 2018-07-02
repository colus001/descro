pragma solidity ^0.4.23;

import "./Math.sol";
import "./SafeMath.sol";
import "./Ownable.sol";

contract DescroFee is Ownable {
  using SafeMath for uint256;

  uint public feeRate = 1000; // 1/1000
  uint public minFee = 0.0001 ether;
  uint public maxFee = 1 ether;

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
