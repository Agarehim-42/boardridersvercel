import React, { useState } from 'react';

const NewArrivals = () => {
  const products = [
    {
      name: 'ELEMENT',
      description: 'Yazılar: 1SZ',
      price: '3699 P',
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image URL
    },
    {
      name: 'QUIKSILVER',
      description: 'Longsliv-rasgard (UPF 50) DNA Bubble Logo',
      price: '5999 P',
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image URL
    },
    {
      name: 'QUIKSILVER',
      description: 'Beisbolka Mountain and Wave',
      price: '3999 P',
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image URL
    },
    {
      name: 'DC SHOES',
      description: 'Svitshot Snowstar',
      price: '12999 P',
      imageUrl: 'https://via.placeholder.com/200', // Replace with actual image URL
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="new-arrivals">
      <h2>Yeni Məhsullar</h2>
      <div className="products">
        {products.slice(0, showAll ? products.length : 3).map((product, index) => (
          <div key={index} className="product">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price}</span>
            <button className="favorite-btn">♥</button>
          </div>
        ))}
      </div>
      <button onClick={handleShowAll} className="show-more-btn">
        {showAll ? 'Az gör' : 'Hamısını gör'}
      </button>
    </div>
  );
};

export default NewArrivals;
