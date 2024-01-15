import React from "react";
import "./buy.css";

const Buy = () => {
  return (
    <div className="buy-container">
      <div className="background-image"></div>
      <div className="text"> Explore and discover new art</div>
      <button className="btn">Buy NFT</button>
      <div className="arrow-scroll">
        <div className="arrow" />
        <div className="arrow" />
        <div className="arrow" />
      </div>
    </div>
  );
};

export default Buy;
