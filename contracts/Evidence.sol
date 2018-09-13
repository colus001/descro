pragma solidity ^0.4.23;

contract Evidance {
  mapping(address => Image[]) private images;

  struct Image {
    string imageHash;
    string ipfsInfo;
  }

  function uploadImage(string hash, string ipfs) public{
    Image memory image = Image(hash, ipfs);
    images[msg.sender].push(image);
  }
}
