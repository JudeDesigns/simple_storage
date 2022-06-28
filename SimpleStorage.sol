//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 public favoriteNumber;

    struct People {
        string name;
        uint256 favoriteNumber;
    }
    People[] public people;

    function addFavoriteNumber(string memory _name, uint256 _favoriteNumber)
        public
    {
        favoriteNumber = _favoriteNumber;
        people.push(People({name: _name, favoriteNumber: _favoriteNumber}));
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
