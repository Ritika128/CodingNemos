import './header.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Header = ({connectedAddress}) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
  };

  const handleBuy = () => {
    navigate('/buy');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleSell = () => {
    navigate('/sell');
  };
  

  return (
    <header className="header">
      <div className="header-container">
        <nav>
          <ul>
            <li onClick={handleHome}>Home</li>
            <li onClick={handleBuy}>Buy</li>
            <li onClick={handleSell}>Sell</li>
            <li onClick={handleContact}>Contact</li>
            {connectedAddress && (<li className="connected-wallet">{connectedAddress}</li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
