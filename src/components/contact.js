import React from 'react';
import './contact.css';
import Header from './header.js';

const Contact = () => {
  return (
    <div className="contact-container">
    <Header />
      <div className="big-image">
        <img src="gallery/contactus.png" alt="Big" />
        <div className="big-text">CONTACT US</div>
      </div>
      <div className="cards-grid">
        <div className="card">
          <h2>Call Us</h2>
          <p>Phone Number: +91 8291088405</p>
        </div>
        <div className="card">
          <h2>Email Us</h2>
          <p>Email ID: infinity@gmail.com</p>
        </div>
        <div className="card">
          <h2>Help and Support</h2>
          <p>For any assistance, reach out to us.</p>
        </div>
      </div>
      <h1 className='Team'>OUR TEAM</h1>
      <div className="team-section">
        <div className="team-member">
          <img src="gallery/pp2.png" alt="Adi" />
          <p>Adi Awaskar</p>
        </div>
        <div className="team-member">
          <img src="gallery/pp1.png" alt="Ritika" />
          <p>Ritika Nankar</p>
        </div>
        <div className="team-member">
          <img src="gallery/pp7.png" alt="Isha" />
          <p>Isha Nair</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
