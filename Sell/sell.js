import React from "react";
import "./sell.css";

const Sell = () => {
  return (
    <div className="sell-container">
      <div className="background-image"></div>
      <div className="text"> Sell</div>
      <button className="sell-btn">Sell NFT</button>
      <button className="create-btn">Create NFT</button>
      <div className="arrow-scroll">
        <div className="arrow" />
        <div className="arrow" />
        <div className="arrow" />
      </div>
    </div>
  );
};

export default Sell;
