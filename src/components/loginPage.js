import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import './loginPage.css';

const LoginPage = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const navigate = useNavigate();

  const connectToMetaMask = () => {
    console.log("Attempting to connect to MetaMask...");
    if (window.ethereum) {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            console.log("Connected to MetaMask!");
            console.log("Connected Account:", accounts[0]);
            setConnectedAddress(accounts[0]); 
          })
          .catch((error) => {
            console.error("Error connecting to MetaMask:", error);
          });
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask extension not detected. Please install MetaMask.");
    }
  };

  const handleBuy = () => {
    navigate('/buy');
  };

  // Define Rectangle component directly here
  const Rectangle = () => (
    <div className="rectangle">
      <div className="logo-metamask">
        <div className='metamask'></div>
        <div className="metamask-text">METAMASK</div>
      </div>

      {connectedAddress ? (
        <div className="connected-wallet">
          CONNECTED TO WALLET ADDRESS: <br/> {connectedAddress}
          <button className="next-button" onClick={handleBuy}>NEXT</button>
        </div>
      ) : (
        <button className="connect-wallet-button" onClick={connectToMetaMask}>
          CONNECT
        </button>
      )}

      <div className="connect-using">Connect with your MetaMask wallet</div>
      <div className="terms">
        By continuing you agree to our Terms & Conditions and Privacy Policy
      </div>
      
      <div className="welcome">Welcome</div>
    </div>
  );

  return (
    <div className="nemos">
      <Rectangle />
      <div className="i-n-fini-ty">
        iNFiniTy
        <br />
      </div>
    </div>
  );
};

export default LoginPage;
