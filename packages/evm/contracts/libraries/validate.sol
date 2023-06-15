//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

library validate {
  function isContract(address _address) internal view returns (bool _r) {
    assembly {
      _r := gt(extcodesize(_address), 0)
    }
  }

  function isERC20(address _address) internal view returns (bool _r) {
    IERC20 token = IERC20(_address);
    _r = token.totalSupply() > 0 && token.balanceOf(msg.sender) >= 0 && token.allowance(msg.sender, address(this)) >= 0;
  }

  function isStringMatch(string memory _a, string memory _b) public pure returns (bool) {
    return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
  }
}
