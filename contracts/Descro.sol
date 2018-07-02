pragma solidity ^0.4.23;

import "./SafeMath.sol";
import "./DescroHelper.sol";

contract Descro is DescroHelper {
  using SafeMath for uint256;

  function createNewEscrow(address _buyer, address _seller) external onlyValidAddress(_buyer) onlyValidAddress(_seller) {
    _addNewEscrow(_buyer, _seller, 0, CREATED);
  }

  function createNewEscrowWithDeposit(address _seller) external payable onlyValidAddress(_seller) {
    uint id = _addNewEscrow(msg.sender, _seller, msg.value, DEPOSITED);

    emit NewEscrow(msg.sender, _seller, id, msg.value);
  }

  function deposit(uint _id) external payable moreThanFee {
    Escrow storage escrow = escrows[_id];
    escrow.balance = msg.value;
    escrow.status = DEPOSITED;

    emit NewEscrow(escrow.buyer, escrow.seller, _id, msg.value);
  }

  function sendProduct(uint _id) external onlySeller(_id) onlyStatus(_id, DEPOSITED) {
    escrows[_id].status = PRODUCT_SENT;
  }

  function approve(uint _id) external onlyBuyer(_id) onlyStatus(_id, PRODUCT_SENT) {
    escrows[_id].status = APPROVED;
  }

  function cancel(uint _id) external onlyBuyerOrSeller(_id) {
    Escrow storage escrow = escrows[_id];
    require(escrow.status <= DEPOSITED);
    escrow.status = CANCELLED;
  }

  function withdraw(uint _id) external onlySeller(_id) requireBalance(_id) onlyStatus(_id, APPROVED) {
    Escrow storage escrow = escrows[_id];
    uint amount = escrow.balance.sub(calculateFee(escrow.balance));
    escrow.balance = 0;
    escrow.status = COMPLETED;
    escrow.seller.transfer(amount);
  }

  function refund(uint _id) external onlyBuyer(_id) requireBalance(_id) onlyStatus(_id, CANCELLED) {
    Escrow storage escrow = escrows[_id];
    escrow.balance = 0;
    escrow.status = REFUNDED;
    escrow.buyer.transfer(escrow.balance);
  }

  function getBalanceByEscrowId(uint _id) external view returns (uint) {
    return escrows[_id].balance;
  }

  function getEscrowsByBuyer(address _buyer) external view returns (uint[]) {
    uint[] memory result = new uint[](escrowCountByOwner[_buyer]);

    uint counter = 0;
    for (uint i = 0; i < escrows.length; i++) {
      if (escrows[i].buyer == _buyer) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
