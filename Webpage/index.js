import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/loginPage';
import Home from './components/home';
import Grid from './components/grid';
import Header from './components/header';
import Buy from './components/buy';
import Sell from './components/sell';
import Create from './components/create';

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/header" element={<Header />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/create" element={<Create />} />
    
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

