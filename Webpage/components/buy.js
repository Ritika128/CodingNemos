import React from "react";
import "./buy.css";
import { useNavigate } from 'react-router-dom';


const Buy = () => {
  const navigate = useNavigate();

const handleSell = () => {
    navigate('/sell');
};
  const handleGrid = () => {
    navigate('/grid');
  };
  return (
    
    <div className="buy-container">
      <div className="background-image"></div>
      <button className="btn" onClick={handleGrid}>Buy NFT</button>
      <div className="arrow-scroll" onClick={handleSell}>
        <div className="arrow" />
        <div className="arrow" />
        <div className="arrow" />
      </div>
    </div>
  );
};

export default Buy;

