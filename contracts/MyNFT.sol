// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private nextTokenId;

    mapping(uint256 => string) private ipfsCids; // Mapping to store IPFS CIDs for each tokenId

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        nextTokenId = 1; // Start token IDs from 1
    }

    function mint(address to, string memory tokenURI, string memory ipfsCid) external onlyOwner {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        ipfsCids[tokenId] = ipfsCid; // Store the IPFS CID for the tokenId
    }

    function getIPFSCid(uint256 tokenId) external view returns (string memory) {
        return ipfsCids[tokenId];
    }

    function getNextTokenId() external view returns (uint256) {
        return nextTokenId;
    }
}
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract MyNFT is ERC721URIStorage, Ownable {
//     constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender){}

//     // Function to mint an NFT
//     function mint(address to, uint256 tokenId, string memory tokenURI) external onlyOwner {
//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, tokenURI);
//     }
// }