pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./Business.sol";
import "./Escrows.sol";

/**
 * @title Descro
 * @dev Mostly public funciton definition related to escrow
 */
contract Descro is Business, Escrows {
  using SafeMath for uint256;

  function createNewEscrow(address _buyer, address _seller) external onlyInService onlyValidAddress(_buyer) onlyValidAddress(_seller) {
    require(_buyer != _seller);
    _addNewEscrow(_buyer, _seller, 0, CREATED);
  }

  function depositNewEscrow(address _seller) external payable onlyInService onlyValidAddress(_seller) {
    require(msg.sender != _seller);
    uint8 _status = DEPOSITED;
    uint id = _addNewEscrow(msg.sender, _seller, msg.value, _status);

    emit LogEscrow(id, msg.sender, _seller, msg.value, _status);
  }

  function deposit(uint _id) external payable moreThanFee {
    Escrow storage escrow = escrows[_id];
    escrow.balance = msg.value;
    escrow.status = DEPOSITED;

    logEscrow(_id, escrow);
  }

  function sendProduct(uint _id) external onlySeller(_id) requireBalance(_id) onlyStatus(_id, DEPOSITED) {
    escrows[_id].status = PRODUCT_SENT;

    logEscrow(_id, escrows[_id]);
  }

  function approve(uint _id) external onlyBuyer(_id) onlyStatus(_id, PRODUCT_SENT) {
    escrows[_id].status = APPROVED;

    logEscrow(_id, escrows[_id]);
  }

  function cancel(uint _id) external onlyBuyerOrSeller(_id) {
    Escrow storage escrow = escrows[_id];
    require(escrow.status <= DEPOSITED);
    escrow.status = CANCELLED;

    logEscrow(_id, escrow);
  }

  function withdraw(uint _id) external onlySeller(_id) requireBalance(_id) onlyWithdrawable(_id) {
    Escrow storage escrow = escrows[_id];
    escrow.seller.transfer(escrow.balance.sub(calculateFee(escrow.balance)));
    escrow.balance = 0;
    escrow.status = COMPLETED;

    logEscrow(_id, escrow);
  }

  function refund(uint _id) external onlyBuyer(_id) requireBalance(_id) onlyStatus(_id, CANCELLED) {
    Escrow storage escrow = escrows[_id];
    escrow.buyer.transfer(escrow.balance);
    escrow.balance = 0;
    escrow.status = REFUNDED;

    logEscrow(_id, escrow);
  }

  function getBalanceByEscrowId(uint _id) external view returns (uint) {
    return escrows[_id].balance;
  }

  function getEscrowsByBuyer(address _buyer) external view returns (uint[]) {
    uint[] memory result = new uint[](escrowCountByBuyer[_buyer]);

    uint counter = 0;
    for (uint i = 0; i < escrows.length; i++) {
      if (escrows[i].buyer == _buyer) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getEscrowsBySeller(address _seller) external view returns (uint[]) {
    uint[] memory result = new uint[](escrowCountBySeller[_seller]);

    uint counter = 0;
    for (uint i = 0; i < escrows.length; i++) {
      if (escrows[i].seller == _seller) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
