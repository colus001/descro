pragma solidity ^0.4.23;

contract TheContract {
  struct Object {
    address createdBy;
    uint balance;
  }

  Object[] public objects;

  mapping (address => uint) countByOwner;

  function createNewObject(address _owner, uint _balance) public {
    objects.push(Object(_owner, _balance));
    countByOwner[_owner]++;
  }

  function getObjectsCountByOwner(address _owner) external view returns (uint) {
    return countByOwner[_owner];
  }

  function getObjectsByOwner(address _owner) external view returns (uint[]) {
    uint[] memory result = new uint[](countByOwner[_owner]);

    uint counter = 0;
    for (uint i = 0; i < objects.length; i++) {
      if (objects[i].createdBy == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
