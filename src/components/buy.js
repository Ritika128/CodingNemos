import React from "react";
import "./buy.css";
import { useNavigate } from 'react-router-dom';
import Header from './header.js';

const Buy = () => {
  const navigate = useNavigate();

const handleSell = () => {
    navigate('/sell');
};
  const handleMarketplace = () => {
    navigate('/Marketplace');
  };
  return (
    
    <div className="buy-container">
    <Header />
      <div className="background-image"></div>
      <button className="btn" onClick={handleMarketplace}>Buy NFT</button>
      <div className="arrow-scroll" onClick={handleSell}>
        <div className="arrow" />
        <div className="arrow" />
        <div className="arrow" />
      </div>
    </div>
  );
};

export default Buy;

