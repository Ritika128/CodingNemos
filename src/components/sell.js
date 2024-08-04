import React from "react";
import "./sell.css";
import { useNavigate } from 'react-router-dom';
import Header from './header.js';

const Sell = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };
  const handleSellNFT = () => {
    navigate('/sellNFT');
  };
  const handleBuy = () => {
    navigate('/buy');
  };

  return (
    <div className="sell-container">
    <Header />
      <div className="background_image"></div>

      <button className="sell-btn" onClick={handleSellNFT}>Sell NFT</button>
      <button className="create-btn" onClick={handleCreate}>Create NFT</button>
      <div className="sell_arrow-scroll" onClick={handleBuy}>
        <div className="sell_arrow" />
        <div className="sell_arrow" />
        <div className="sell_arrow" />
      </div>
    </div>
  );
};

export default Sell;

