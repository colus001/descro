pragma solidity ^0.4.23;

import "./Math.sol";
import "./SafeMath.sol";
import "./DescroFee.sol";

contract DescroHelper is DescroFee {
  using SafeMath for uint256;

  uint8 constant CREATED = 0;
  uint8 constant DEPOSITED = 1;
  uint8 constant PRODUCT_SENT = 2;
  uint8 constant APPROVED = 3;
  uint8 constant CANCELLED = 4;
  uint8 constant COMPLETED = 5;
  uint8 constant REFUNDED = 6;

  event NewEscrow(address buyer, address seller, uint escrowId, uint balance);

  struct Escrow {
    uint createdAt;
    address buyer;
    address seller;
    uint balance;
    uint8 status;
  }

  Escrow[] public escrows;

  mapping (address => uint) escrowCountByOwner;

  modifier onlyValidAddress(address _address) {
    require(_address != 0x0);
    _;
  }

  modifier onlyStatus(uint _id, uint _status) {
    require(escrows[_id].status == _status);
    _;
  }

  modifier moreThanFee() {
    require(msg.value > minFee);
    _;
  }

  modifier onlyBuyerOrSeller(uint _id) {
    Escrow memory escrow = escrows[_id];
    require(msg.sender == escrow.buyer || msg.sender == escrow.seller);
    _;
  }

  modifier onlyBuyer(uint _id) {
    Escrow memory escrow = escrows[_id];
    require(msg.sender == escrow.buyer);
    _;
  }

  modifier onlySeller(uint _id) {
    Escrow memory escrow = escrows[_id];
    require(msg.sender == escrow.seller);
    _;
  }

  modifier requireBalance(uint _id) {
    Escrow memory escrow = escrows[_id];
    require(escrow.balance > 0);
    _;
  }

  function getBalance() external view onlyOwner returns (uint) {
    return address(this).balance;
  }

  function collect() external onlyOwner {
    owner.transfer(address(this).balance);
  }

  function _addNewEscrow(address _buyer, address _seller, uint _balance, uint8 _status) internal returns (uint) {
    uint id = escrows.push(Escrow(now, _buyer, _seller, _balance, _status));
    escrowCountByOwner[msg.sender] = escrowCountByOwner[msg.sender].add(1);
    return id;
  }
}
