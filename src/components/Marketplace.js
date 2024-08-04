import React, { useState, useEffect, useCallback } from "react";
import {ethers} from "ethers";
import "./Marketplace.css";
import Header from './header.js';
import {
  MarketplaceContractAddress,
  MarketplaceContractABI,
} from "../constants";

const Marketplace = () => {
  const [listedNFTs, setListedNFTs] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const fetchNFTDetails = useCallback(async (tokenId, marketplaceContract) => {
    try {
      const ipfsCid = await marketplaceContract.getIPFSCid(tokenId);
      const ipfsResponse = await fetch(`https://ipfs.io/ipfs/${ipfsCid}`);
      const ipfsData = await ipfsResponse.json();

      const nftDetails = {
        tokenId,
        name: ipfsData.name || "N/A",
        description: ipfsData.description || "N/A",
        image: ipfsData.image
          ? `${ipfsData.image}`
          : "https://via.placeholder.com/150",
        price: ethers.utils.formatUnits(
          await marketplaceContract.getNFTPrice(tokenId),
          "ether"
        ),
      };

      return nftDetails;
    } catch (error) {
      console.error("Error fetching NFT details:", error);
      return {
        tokenId,
        name: "N/A",
        description: "N/A",
        image: "https://via.placeholder.com/150",
        price: ethers.utils.formatUnits(
          await marketplaceContract.getNFTPrice(tokenId),
          "ether"
        ),
      };
    }
  }, []);

  const fetchListedNFTs = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        MarketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );

      const listedTokenIds = await marketplaceContract.getListedNFTs();

      const detailedNFTs = await Promise.all(
        listedTokenIds.map(async (tokenId) => {
          const nftDetails = await fetchNFTDetails(
            tokenId,
            marketplaceContract
          );
          return nftDetails;
        })
      );

      setListedNFTs(detailedNFTs);
    } catch (error) {
      console.error("Error fetching listed NFTs:", error);
    }
  }, [fetchNFTDetails]);

  useEffect(() => {
    const fetchListedNFTsAndSet = async () => {
      await fetchListedNFTs();
    };

    fetchListedNFTsAndSet();
  }, [fetchListedNFTs]);

  // const handleBuyNFT = async () => {
  //   try {
  //     console.log("Buying NFT:", selectedNFT);
  //   } catch (error) {
  //     console.error("Error buying NFT:", error);
  //   }
  // };

  const handleBuyNFT = async () => {
    try {
      if (!selectedNFT) {
        console.error("No selected NFT");
        return;
      }

      console.log("Buying NFT:", selectedNFT);

      // Initialize Ethereum wallet connection
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect to your smart contract
      const marketplaceContract = new ethers.Contract(
        MarketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );

      // Call the buyNFT function to purchase the selected NFT
      console.log("Calling buyNFT function...");
      const transaction = await marketplaceContract.buyNFT(
        selectedNFT.tokenId,
        {
          value: ethers.utils.parseEther(selectedNFT.price),
          gasLimit: 3000000,
          gasPrice: ethers.utils.parseUnits("20", "gwei"), // Set an appropriate gas price
        }
      );

      console.log("Transaction sent:", transaction);

      // Wait for the transaction to be mined
      console.log("Waiting for transaction to be mined...");
      const receipt = await transaction.wait();

      if (receipt.status === 0) {
        console.error(
          "Transaction failed. Revert reason:",
          receipt.logs[0].data
        );
      } else {
        console.log("NFT purchased successfully:", selectedNFT);
        console.log("Listing removed successfully.");
      }

      console.log("NFT purchased successfully:", selectedNFT);

      console.log("Listing removed successfully.");

      // You can add additional logic or UI updates after the purchase is successful
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };
  

  return (
    <div>
    <Header />

      <h2 className="heading">Marketplace</h2>
      <div className="listed-nfts">
        {listedNFTs.map((nft) => (
          <div key={nft.tokenId} className="nft-item">
            <img src={nft.image} alt={`NFT ${nft.tokenId}`} />
            <p>{nft.name}</p>
            <p>{nft.description}</p>
            <p>Price: {nft.price} ETH</p>
            <button onClick={() => setSelectedNFT(nft)}>Buy NFT</button>
          </div>
        ))}
      </div>

      {selectedNFT && (
        <div className="buy-modal">
          <h3>Confirm Purchase</h3>
          <p>Name: {selectedNFT.name}</p>
          <p>Description: {selectedNFT.description}</p>
          <p>Price: {selectedNFT.price} ETH</p>
          <button onClick={handleBuyNFT}>Confirm Buy</button>
          <button onClick={() => setSelectedNFT(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;