pragma solidity ^0.4.24;

/* import "./Escrow.sol"; */

contract Descro {
  struct Escrow {
    address createdBy;
    /* address buyer;
    address seller;
    address owner; */
    uint budget;
    /* uint balance;
    uint status; */
  }

  Escrow[] public escrows;
  uint count = 0;

  event NewEscrow(address createdBy, uint escrowId, uint budget);

  mapping (address => uint) escrowCountByOwner;

  function createNewEscrow(address _owner, uint _budget) public {
    uint id = escrows.push(Escrow(_owner, _budget));
    escrowCountByOwner[_owner]++;
    count++;
    emit NewEscrow(_owner, id, _budget);
  }

  function getEscrowByOwner(address _owner) external view returns (uint[]) {
    uint[] memory result = new uint[](escrowCountByOwner[_owner]);
    /* uint[] memory result = new uint[](count); */

    uint counter = 0;
    for (uint i = 0; i < escrows.length; i++) {
      if (escrows[i].createdBy == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
