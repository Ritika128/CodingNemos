import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "./create.css";
import { NFTContractAddress, NFTContractABI } from "../constants";
import { pinataApiKey, pinataSecretApiKey } from "../constants2";

const CreateNFT = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const { files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      imageFile: files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description, imageFile } = formData;

    try {
      // Upload image to IPFS and get the IPFS URL
      console.log("Uploading image to IPFS...");
      const ipfsImageHash = await uploadToIPFS(imageFile);
      console.log("IPFS Image Hash:", ipfsImageHash);

      // Create metadata object
      const metadata = {
        name,
        description,
        image: `https://ipfs.io/ipfs/${ipfsImageHash}`,
      };

      // Upload metadata to IPFS and get the IPFS URL
      const ipfsMetadataHash = await uploadMetadataToIPFS(metadata);
      console.log("IPFS Metadata Hash:", ipfsMetadataHash);

      // Connect to Ethereum network using ethers
      console.log("Connecting to Ethereum network...");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const connectedAddress = await signer.getAddress(); // Get connected Ethereum account address

      // Instantiate the smart contract using ethers
      console.log("Instantiating the smart contract...");
      const contract = new ethers.Contract(
        NFTContractAddress,
        NFTContractABI,
        signer
      );

      // Mint NFT using the smart contract
      console.log("Minting NFT...");
      await contract.mint(
        connectedAddress,
        `https://ipfs.io/ipfs/${ipfsMetadataHash}`,
        ipfsMetadataHash
      );

      // Clear the form
      console.log("NFT Minted successfully. Clearing the form.");
      setFormData({
        name: "",
        description: "",
        imageFile: null,
      });
      navigate("/sell");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle the error, e.g., show a user-friendly message
    }
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          body: formData,
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      console.log("Pinata API Response Status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch:", response.status, response.statusText);
        throw new Error(`IPFS Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Pinata API Response:", data);

      if (!data || !data.IpfsHash) {
        console.error("Unexpected response from IPFS:", response.statusText);
        throw new Error("IPFS Upload failed with unexpected response");
      }

      return data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
    }
  };

  const uploadMetadataToIPFS = async (metadata) => {
    try {
      // Upload metadata to IPFS and get the IPFS URL
      console.log("Uploading metadata to IPFS...");
      const ipfsMetadataHash = await uploadToIPFS(
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      console.log("IPFS Metadata Hash:", ipfsMetadataHash);

      return ipfsMetadataHash;
    } catch (error) {
      console.error("Error uploading metadata to IPFS:", error);
      throw error;
    }
  };

  return (
    <div className="create-webpage-background"> {/* Added class name for background */}
      <div className="create-container"> {/* Added class name for container */}
        <form onSubmit={handleSubmit} className="create-form"> {/* Added class name for form */}
          <h2 className="heading_create">CREATE</h2>
          <label className="create-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="create-input" 
          />

          <label className="create-label">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="create-textarea" 
          />

          <label className="create-label">Choose Image File:</label>
          <div className="image-input-container">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="image-input" 
            />
          </div>

          <button type="submit" className="create-create_button">Create NFT</button> {/* Added class name for button */}
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
