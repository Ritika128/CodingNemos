import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/loginPage';
import Home from './components/home';
import Marketplace from './components/Marketplace';
import Header from './components/header';
import Buy from './components/buy';
import Sell from './components/sell';
import Create from './components/create';
import SellNFT from './components/SellNFT';
import Contact from './components/contact';


const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/header" element={<Header />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/SellNFT" element={<SellNFT />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

