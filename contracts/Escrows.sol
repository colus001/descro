pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./Pausible.sol";

/**
 * @title Escrows
 * @dev Define escrows in Descro
 */
contract Escrows is Pausible {
  using SafeMath for uint256;

  uint8 constant CREATED = 0;
  uint8 constant DEPOSITED = 1;
  uint8 constant PRODUCT_SENT = 2;
  uint8 constant APPROVED = 3;
  uint8 constant CANCELLED = 4;
  uint8 constant COMPLETED = 5;
  uint8 constant REFUNDED = 6;

  struct Escrow {
    uint createdAt;
    address buyer;
    address seller;
    uint balance;
    uint8 status;
  }

  Escrow[] public escrows;

  mapping (address => uint) escrowCountByBuyer;
  mapping (address => uint) escrowCountBySeller;

  /* Loggers */
  event LogEscrow(uint escrowId, address buyer, address seller, uint balance, uint8 status);

  function logEscrow(uint _id, Escrow _escrow) internal {
    emit LogEscrow(_id, _escrow.buyer, _escrow.seller, _escrow.balance, _escrow.status);
  }

  /* Modifiers */
  modifier onlyStatus(uint _id, uint _status) {
    require(escrows[_id].status == _status);
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

  /* Utility Modifiers */
  modifier onlyValidAddress(address _address) {
    require(_address != 0x0);
    _;
  }

  /* Creator */
  function _addNewEscrow(address _buyer, address _seller, uint _balance, uint8 _status) private returns (uint) {
    uint id = escrows.push(Escrow(now, _buyer, _seller, _balance, _status));
    escrowCountByBuyer[_buyer] = escrowCountByBuyer[_buyer].add(1);
    escrowCountBySeller[_seller] = escrowCountBySeller[_seller].add(1);
    return id;
  }

  function createNewEscrow(address _buyer, address _seller) external onlyInService onlyValidAddress(_buyer) onlyValidAddress(_seller) {
    _addNewEscrow(_buyer, _seller, 0, CREATED);
  }

  function createNewEscrowWithDeposit(address _seller) external payable onlyInService onlyValidAddress(_seller) {
    uint8 _status = DEPOSITED;
    uint id = _addNewEscrow(msg.sender, _seller, msg.value, _status);

    emit LogEscrow(id, msg.sender, _seller, msg.value, _status);
  }
}
