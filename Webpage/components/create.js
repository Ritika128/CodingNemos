import React, { useState } from 'react';
import './create.css';

const Create = () => {
  const [artworkDisplay, setArtworkDisplay] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    imageFile: null,
    description: '',
    price: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'imageFile' ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, imageUrl, imageFile, description, price } = formData;

    setArtworkDisplay(
      <div className="user-input">
        <div className="user-info">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Price: {price}</p>
        </div>
        <img src={imageUrl || URL.createObjectURL(imageFile)} alt="Artwork" />
      </div>
    );
    // hides the form
    setFormData({
      name: '',
      imageUrl: '',
      imageFile: null,
      description: '',
      price: '',
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={`form ${artworkDisplay ? 'hidden' : ''}`}>
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />
        <label htmlFor="imageUrl">Image URL:</label>
        <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} /><br />
        <label htmlFor="imageFile">Image File:</label>
        <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleChange} required /><br />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required /><br />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" step="0.01" value={formData.price} onChange={handleChange} required /><br />
        <input type="submit" value="Create NFT" />
      </form>
      {artworkDisplay}
    </div>
  );
};

export default Create;
