import React, { useEffect, useState } from 'react';
import Header from './Header';
import HouseCard from './HouseCard';
import SubHeader from './SubHeader';
import Footer from './Footer';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState({});

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/all-properties`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setProperties(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleLike = async (propertyId) => {
    const isCurrentlyLiked = !!likedProperties[propertyId];

    // Update state optimistically
    setLikedProperties((prevLikedProperties) => ({
      ...prevLikedProperties,
      [propertyId]: !isCurrentlyLiked
    }));

    // Send like/unlike request to backend
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/like-property`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId, liked: !isCurrentlyLiked })
      });

      const data = await response.json();
      // Optionally update the state with the new like count from the backend
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === propertyId ? { ...property, likes: data.likes } : property
        )
      );
      console.log(data);
    } catch (error) {
      console.error('Failed to update likes:', error);
      // Revert the optimistic update if the request fails
      setLikedProperties((prevLikedProperties) => ({
        ...prevLikedProperties,
        [propertyId]: isCurrentlyLiked
      }));
    }
  };

  return (
    <div className='Buy'>
      <Header />
      <SubHeader/>
      <div className='buy-container'>
        <div className='All-properties'>
          {properties.length > 0 ? (
            properties.map((property) => (
              <HouseCard
                key={property._id}
                property={property}
                isLiked={!!likedProperties[property._id]}
                onLikeToggle={() => toggleLike(property._id)}
              />
            ))
          ) : (
            <div>
              <h1 style={{ fontWeight: 400, fontSize: '3rem' }}>No properties found !!</h1>
            </div>
          )}
        </div>
      </div>
      { properties.length > 0 ?<Footer/> : <></>}
    </div>
  );
};

export default Buy;
