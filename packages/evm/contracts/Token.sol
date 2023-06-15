pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IFund.sol";

contract Token is ERC20, Ownable, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  address public fundAddress;
  IFund private fund;
  mapping(address => bool) whiteList;

  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    _grantRole(MINTER_ROLE, owner());
    updateWhiteList(owner(), true);
  }

  function addMinterRole(address _to) public onlyOwner {
    _grantRole(MINTER_ROLE, _to);
  }

  function setFund(address _address) public onlyOwner {
    fundAddress = _address;
    fund = IFund(_address);
  }

  function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
    _mint(_to, _amount);
  }

  function updateWhiteList(address _address, bool _allowed) public onlyOwner {
    whiteList[_address] = _allowed;
  }

  function _beforeTokenTransfer(address _from, address _to, uint256 _amount) internal view override {
    require(whiteList[_to] == true, "Recipient must be in whiteList");
  }
}
