import React from "react";
import { useState } from "react";
import "./ConnectWallet.css"; 

const ConnectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const providerArray = [
    {
      provider: "/gallery/provider-1.png", 
      name: "Metamask",
    },
 
  ];

  return (
    <div className="connectWallet">
      <div className="connectWallet_box">
        <h1>Connect your wallet</h1>
        <p className="connectWallet_box_para">
          Connect with one of our available wallet providers or create a new one
        </p>

        <div className="connectWallet_box_provider">
          {providerArray.map((el, i) => (
            <div
              className={`connectWallet_box_provider_item ${
                activeBtn === i + 1 ? "active" : ""
              }`}
              key={i + 1}
              onClick={() => setActiveBtn(i + 1)}
            >
              <img
                src={el.provider}
                alt={el.name}
                width={50}
                height={50}
                className="connectWallet_box_provider_item_img"
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
