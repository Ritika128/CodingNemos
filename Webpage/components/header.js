import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleHome = () => {
    navigate('/home');
  };
    const handleCreate = () => {
    navigate('/create');
  };
    const handleConnect = () => {
    navigate('/connect');
  };
  return (
    <header className="header">
      <div className="header-container">
        <nav>
          <ul>
            <li onClick={handleHome}>Home</li>
            <li onClick={handleCreate}>Create</li>
            <li>Wallet</li>
            <li onClick={handleConnect}>Connect</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
