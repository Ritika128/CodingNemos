// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyNFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SignedMath.sol";

contract Marketplace is Ownable {
    using Math for uint256;

    // NFT contract address
    address private nftContract;

    // Mapping to track the price of each listed NFT
    mapping(uint256 => uint256) private nftPrices;

    // Array to store the list of NFTs listed for sale
    uint256[] private listedNFTs;

    // Event to notify when an NFT is sold
    event NFTSold(address indexed buyer, uint256 indexed tokenId, uint256 price);

    // Event to notify when an NFT is listed for sale
    event NFTListedForSale(uint256 indexed tokenId, uint256 price);

    constructor(address _nftContract) Ownable(msg.sender) {
        nftContract = _nftContract;
    }

    // Function to list an NFT for sale
    function listNFTForSale(uint256 tokenId, uint256 price) external onlyOwnerOfNFT(tokenId) {
        require(price > 0, "Price must be greater than zero");

        // Check if the NFT is not already listed
        require(nftPrices[tokenId] == 0, "NFT is already listed for sale");

        // Add the tokenId to the listedNFTs array
        listedNFTs.push(tokenId);

        // Set the price for the listed NFT
        nftPrices[tokenId] = price;

        // Emit an event to notify that the NFT is listed for sale
        emit NFTListedForSale(tokenId, price);
    }

    // Function to fetch the list of NFTs listed for sale
    function getListedNFTs() external view returns (uint256[] memory) {
        return listedNFTs;
    }

    // Function to fetch the IPFS CID for a given tokenId
    function getIPFSCid(uint256 tokenId) external view returns (string memory) {
        return MyNFT(nftContract).getIPFSCid(tokenId);
    }

    // Function to buy an NFT
    function buyNFT(uint256 tokenId) external payable {
        require(nftPrices[tokenId] > 0, "NFT not listed for sale");
        require(msg.value >= nftPrices[tokenId], "Insufficient funds");

        address seller = ownerOfNFT(tokenId);
        address buyer = msg.sender;

        // Transfer the NFT to the buyer
        MyNFT(nftContract).transferFrom(seller, buyer, tokenId);

        // Transfer funds to the seller
        payable(seller).transfer(msg.value);

        // Emit an event to notify that the NFT is sold
        emit NFTSold(buyer, tokenId, msg.value);

        // Remove the listing
        removeListing(tokenId);
    }

    // Modifier to ensure the caller is the owner of the NFT
    modifier onlyOwnerOfNFT(uint256 tokenId) {
        require(ownerOfNFT(tokenId) == msg.sender, "You don't own this NFT");
        _;
    }

    // Function to get the owner of an NFT
    function ownerOfNFT(uint256 tokenId) internal view returns (address) {
        return MyNFT(nftContract).ownerOf(tokenId);
    }

    // Function to mint an NFT in the MyNFT contract
    function mintNFT(address to, string memory tokenURI, string memory ipfsCid) external onlyOwner {
        MyNFT(nftContract).mint(to, tokenURI, ipfsCid);
    }

    

    // Internal function to remove the listing of an NFT
    function removeListing(uint256 tokenId) internal {
        // Find the index of the tokenId in the listedNFTs array
        for (uint256 i = 0; i < listedNFTs.length; i++) {
            if (listedNFTs[i] == tokenId) {
                // Remove the tokenId from the array
                if (i < listedNFTs.length - 1) {
                    listedNFTs[i] = listedNFTs[listedNFTs.length - 1];
                }
                listedNFTs.pop();
                break;
            }
        }

        // Remove the listing from the mapping
        delete nftPrices[tokenId];
    }
    function getNFTPrice(uint256 tokenId) external view returns (uint256) {
    return nftPrices[tokenId];
}

}
