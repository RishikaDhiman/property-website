import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import Footer from './Footer';

const Property = () => {

  const [property, setProperty] = useState(null);

  const { id } = useParams(); 

  const fetchData = async()=>{

    const token = localStorage.getItem("token")

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/all-properties/${id}`,{
      method : "GET",
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    console.log(response);
      
    const data = await response.json();
    console.log(data);

    setProperty(data);

  }

  const handleInterest = async () => {

    const subject = 'Interested in Your Property';
    const body = 'Hi, I am interested in your property. Please provide me with more information.';
    const mailtoLink = `mailto:${property.owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

  };

  useEffect(()=>{
    fetchData();
  },[id]);



  return (
    <div>

      <Header/>
      <div className="Property">
        <div className='property_details'>
          <img src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396132.jpg&fm=jpg"/>
          {property && (<div className="property-details-1">
                    <h3>{property.address}</h3>
                    <h5>{property.city}, {property.state}</h5>
          </div>)}
          <hr></hr>
          {property && (<div className="property-details-2">
                    <div className='inner-house-details'>
                      <i className="fa-solid fa-bed"></i>
                      <p>Beds</p>
                      <p>{property.bedrooms}</p>
                    </div>
                    <div className='inner-house-details'>
                      <i className="fa-solid fa-bath"></i>
                      <p>Baths</p>
                      <p>{property.bathrooms}</p>
                    </div>
                    <div className='inner-house-details'>
                      <i className="fa-solid fa-building-columns"></i>
                      <p>Colleges</p>
                      <p>{property.colleges}</p>
                    </div>
                    <div className='inner-house-details'>
                      <i className="fa-solid fa-hospital"></i>
                      <p>Hosptials</p>
                      <p>{property.hospitals}</p>
                    </div>
          </div>)}
          <hr></hr>
          {property && (<div className='property-price'>
            <h3>Price : ${property.price}</h3>
          </div>)}
          <hr></hr>
          {property && (<div className='owner-info'>
            <h1>Owner's Information</h1>
            <div className='owner-details'>
              <p>Name : {property.owner.name}</p>
              <p>Phone : {property.owner.phone}</p>
              <p>Email : {property.owner.email}</p>
            </div>
            <div className='intersted-btn'>
              <p>Send email to owner !!</p>
              <button onClick={handleInterest}>I'm interseted</button>
            </div>
            <hr></hr>
          </div>)}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Property
