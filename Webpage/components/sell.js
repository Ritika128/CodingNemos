import React from "react";
import "./sell.css";
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };

  return (
    <div className="sell-container">
      <div className="background_image"></div>

      <button className="sell-btn">Sell NFT</button>
      <button className="create-btn" onClick={handleCreate}>Create NFT</button>
    </div>
  );
};

export default Sell;
