import React from 'react';
import { Link } from 'react-router-dom';

const HouseCard = ({ property, isLiked, onLikeToggle }) => {
  return (
    <div className='house-card'>
      <img
        src={property.image || 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396132.jpg&fm=jpg'}
        alt='House'
      />
      <div className='house-details1AndIcon'>
        <div className='house-details-1'>
          <h3>{property.address}</h3>
          <h5>{property.city}, {property.state}</h5>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <i
          className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
          onClick={onLikeToggle}
        ></i>
        <p>{property.likes}</p>
        </div>
      </div>
      <hr />
      <div className='house-details-2'>
        <div className='inner-house-details'>
          <i className='fa-solid fa-bed'></i>
          <p>Beds</p>
          <p>{property.bedrooms}</p>
        </div>
        <div className='inner-house-details'>
          <i className='fa-solid fa-bath'></i>
          <p>Baths</p>
          <p>{property.bathrooms}</p>
        </div>
        <div className='inner-house-details'>
          <i className='fa-solid fa-building-columns'></i>
          <p>Colleges</p>
          <p>{property.colleges}</p>
        </div>
        <div className='inner-house-details'>
          <i className='fa-solid fa-hospital'></i>
          <p>Hospitals</p>
          <p>{property.hospitals}</p>
        </div>
      </div>
      <hr />
      <Link to={`/buy/${property._id}`}>
        Go to Property <i className='fa-solid fa-arrow-up-right-from-square'></i>
      </Link>
    </div>
  );
};

export default HouseCard;
