/* home.js */
import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/loginPage');
  };

  const handleBuy = () => {
    navigate('/buy');
  };

  return (
    <div className="home-container">
      <video className="home-bgvideo" autoPlay loop muted>
        <source src="/gallery/video.mp4" type="video/mp4" />
      </video>
      
      <div className="home-text">
        <div className="home-logo">iNFiniTy</div>
        <h1>JOIN THE NEW ERA OF ART</h1>
        <p>Unleash your creative potential with our NFT platform, where accessible and secure tools are at your disposal to transform your art into NFTs.</p>
        <div className="arrow_scroll" onClick={handleBuy}>
        <div className="arroww" />
        <div className="arroww" />
        <div className="arroww" />
      </div>
        <svg
          onClick={handleLogin}
          className="home-userlogo"
          width="28"
          height="31"
          viewBox="0 0 28 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 15.5033C10.9116 15.5033 8.4 12.7233 8.4 9.30469C8.4 5.88613 10.9116 3.10603 14 3.10603C17.0884 3.10603 19.6 5.88613 19.6 9.30469C19.6 12.7233 17.0884 15.5033 14 15.5033ZM19.2612 16.5462C20.2414 15.6769 21.0325 14.5748 21.5758 13.3213C22.1191 12.0678 22.4008 10.695 22.4 9.30469C22.401 7.73263 22.0419 6.18603 21.3563 4.8093C20.6706 3.43257 19.6808 2.27059 18.4794 1.43227C17.2779 0.59395 15.9041 0.106588 14.4862 0.0155901C13.0684 -0.0754081 11.6528 0.233058 10.3719 0.912058C9.09098 1.59106 7.98651 2.61847 7.16171 3.89827C6.33692 5.17806 5.81871 6.66837 5.65558 8.23003C5.49246 9.79168 5.68971 11.3736 6.22891 12.8279C6.7681 14.2823 7.63166 15.5616 8.73881 16.5462C3.61621 18.677 0 23.9413 0 31H2.8C2.8 23.2517 7.8246 18.6027 14 18.6027C20.1754 18.6027 25.2 23.2517 25.2 31H28C28 23.9413 24.3838 18.677 19.2612 16.5462Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
