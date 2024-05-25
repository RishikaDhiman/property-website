import React from 'react';
import { Link } from 'react-router-dom';

const HouseCard = ({ property, isLiked, onLikeToggle }) => {
  return (
    <div className='house-card'>
      <img
        src={property.image || 'https://static.wixstatic.com/media/84770f_ca6a1aafafa04284a052e09b53a0fce9~mv2_d_3456_2304_s_2.jpeg/v1/fill/w_435,h_260,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image-place-holder.jpeg'}
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
