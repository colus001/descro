pragma solidity ^0.4.23;

library Math {
  function min(uint a, uint b) internal pure returns (uint) {
    return a < b ? a : b;
  }
  /* function min(uint[] numbers) internal pure returns (uint) {
    return numbers[0] < numbers[1] ? numbers[0] : numbers[1];
  } */

  function max(uint a, uint b) internal pure returns (uint) {
    return a > b ? a : b;
  }
}
