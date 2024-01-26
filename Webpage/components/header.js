import './header.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const Header = () => {
    const navigate = useNavigate();
    const handleHome = () => {
    navigate('/home');
  };
    const handleCreate = () => {
    navigate('/create');
  };
    const handleTrending = () => {
    navigate('/trending');
  };

  function connectToMetaMask() {
        // Check if MetaMask is installed
        if (window.ethereum) {
          try {
            // Request account access if needed
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then(() => {
                console.log("Connected to MetaMask!");
              })
              .catch((error) => {
                console.error("Error connecting to MetaMask:", error);
              });}
              catch (error) {
            console.error("Error connecting to MetaMask:", error);
          }
        } else {
          console.error(
            "MetaMask extension not detected. Please install MetaMask."
          );
        }
      }

  
  return (
    <header className="header">
      <div className="header-container">
        <nav>
          <ul>
            <li onClick={handleHome}>Home</li>
            <li onClick={handleCreate}>Create</li>
            <li>Cart</li>
            <li onClick={handleTrending}>Trending</li>
            <button id="connectButton" onclick="connectToMetaMask()">Connect to MetaMask</button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
