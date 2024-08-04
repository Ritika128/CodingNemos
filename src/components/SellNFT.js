import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import './SellNFT.css';
import {
  MarketplaceContractAddress,
  MarketplaceContractABI,
} from "../constants";

const SellNFT = () => {
  const navigate = useNavigate();
  const [listFormData, setListFormData] = useState({
    tokenId: "",
    price: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setListFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleListNFT = async () => {
    try {
      const { tokenId, price } = listFormData;

      console.log("Connecting to Ethereum network...");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      console.log("Connected to Ethereum network. Getting signer...");

      const connectedAddress = await signer.getAddress();
      console.log("Connected to Ethereum account:", connectedAddress);

      const marketplaceContract = new ethers.Contract(
        MarketplaceContractAddress,
        MarketplaceContractABI,
        signer
      );

      console.log("Listing NFT on the Marketplace...");

      await marketplaceContract.listNFTForSale(
        tokenId,
        ethers.utils.parseUnits(price.toString(), "ether")
      );

      console.log("NFT listed successfully!");

      // Redirects to the marketplace page after listing successfully
      navigate("/marketplace");

    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Error listing NFT. Please try again.");
    }
  };

  return (
    <div className="sellnft-webpage-background">
      <div className="sellnft-container">
        <form className="sellnft-form">
          <h2 className="heading_sellnft">List Your NFT on the Marketplace</h2>
          <label className="sellnft-label">Token ID:</label>
          <input
            type="number"
            name="tokenId"
            value={listFormData.tokenId}
            onChange={handleChange}
            required
            className="sellnft-input"
          />

          <label className="sellnft-label">Price (ETH):</label>
          <input
            type="number"
            name="price"
            value={listFormData.price}
            onChange={handleChange}
            required
            className="sellnft-input"
          />

          <button
            type="button"
            onClick={handleListNFT}
            className="sellnft-list_button"
          >
            List NFT
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellNFT;

