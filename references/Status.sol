pragma solidity ^0.4.24;

contract Status {
  uint public constant CREATED = 0;
  uint public constant DEPOSITED = 1;
  uint public constant PRODUCT_SENT = 2;
  uint public constant APPROVED = 3;
  uint public constant CANCELLED = 4;
  uint public constant COMPLETED = 5;
}
