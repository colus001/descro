pragma solidity ^0.4.24;

contract Escrow {
  uint constant CREATED = 0;
  uint constant READY = 1;
  uint constant DEPOSITED = 2;
  uint constant PRODUCT_SENT = 3;
  uint constant APPROVED = 4;
  uint constant CANCELLED = 5;
  uint constant COMPLETED = 6;

  address public createdBy;
  address public buyer;
  address public seller;
  address public owner;
  uint budget;
  uint balance = 0;
  uint status;

  event Deposited();
  event Cancelled();
  event Completed();
  event ProductSent();

  modifier onlyValidAddress(address _address) {
    require(_address != address(0));
    _;
  }

  modifier onlyStatus(uint _status) {
    require(status == _status);
    _;
  }

  modifier onlyBuyer(address _buyer) {
    require(buyer == _buyer);
    _;
  }

  modifier onlySeller(address _seller) {
    require(seller == _seller);
    _;
  }

  modifier onlyCreatedBy(address _createdBy) {
    require(createdBy == _createdBy);
    _;
  }

  constructor(address _createdBy, uint _budget) public {
    require(_budget > 0);
    budget = _budget;
    createdBy = _createdBy;
    status = CREATED;
  }

  function getCreatedBy() external view returns (address) {
    return createdBy;
  }

  function setStatus(uint _status) private {
    status = _status;
  }

  function setSeller(address _seller) external onlyStatus(CREATED) onlyValidAddress(_seller) {
    buyer = msg.sender;
    seller = _seller;
    status = READY;
  }

  function setBuyer(address _buyer) external onlyStatus(CREATED) onlyValidAddress(_buyer) {
    buyer = _buyer;
    seller = msg.sender;
    status = READY;
  }

  function deposit() external payable onlyStatus(READY) {
    require(msg.value == budget);
    balance += msg.value;
    status = DEPOSITED;
    emit Deposited();
  }

  function send() external onlyStatus(DEPOSITED) onlySeller(msg.sender) {
    status = PRODUCT_SENT;
    emit ProductSent();
  }

  function approve() external onlyStatus(PRODUCT_SENT) onlyBuyer(msg.sender) {
    status = APPROVED;
    complete();
  }

  function cancel() external onlyCreatedBy(msg.sender) {
    status = CANCELLED;
    emit Cancelled();
  }

  function complete() private {
    seller.transfer(balance);
    status = COMPLETED;
    emit Completed();
  }
}
