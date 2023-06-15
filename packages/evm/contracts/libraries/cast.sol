//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

library cast {
  function stringToUint(string calldata _s) public pure returns (uint256) {
    bytes memory b = bytes(_s);
    uint256 result = 0;
    for (uint256 i = 0; i < b.length; i++) {
      if (uint8(b[i]) >= 48 && uint8(b[i]) <= 57) {
        result = result * 10 + (uint8(b[i]) - 48);
      }
    }
    return result;
  }

  function stringToAddress(string memory _s) public pure returns (address) {
    bytes memory b = bytes(_s);
    uint160 addr = 0;
    uint160 b1;
    uint160 b2;
    for (uint256 i = 2; i < 2 + 2 * 20; i += 2) {
      addr *= 256;
      b1 = uint160(uint8(b[i]));
      b2 = uint160(uint8(b[i + 1]));
      if ((b1 >= 97) && (b1 <= 102)) {
        b1 -= 87;
      } else if ((b1 >= 65) && (b1 <= 70)) {
        b1 -= 55;
      } else if ((b1 >= 48) && (b1 <= 57)) {
        b1 -= 48;
      }
      if ((b2 >= 97) && (b2 <= 102)) {
        b2 -= 87;
      } else if ((b2 >= 65) && (b2 <= 70)) {
        b2 -= 55;
      } else if ((b2 >= 48) && (b2 <= 57)) {
        b2 -= 48;
      }
      addr += (b1 * 16 + b2);
    }
    return address(addr);
  }
}
