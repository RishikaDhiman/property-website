import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom';
import SubHeader from './SubHeader';
import Footer from './Footer';

const MyProperties = () => {

  const [properties, setProperties] = useState([]);

  const fetchData = async()=>{

    const token = localStorage.getItem("token")

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-properties`,{
      method : "GET",
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    console.log(response);
      
    const data = await response.json();
    console.log(data);

    setProperties(data);

  }

  const navigate = useNavigate();

  const handleSaleBtn=()=>{
    navigate("/sale");
  }


  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <div>
      <Header/>
      <SubHeader/>
      <div className='MyProperty'>
        <div className='All-properties'>
        {
          properties.length>0 && properties.map((property)=>(
            <div className="house-card" key={property._id}>
                <img src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396132.jpg&fm=jpg"/>
                <div className='house-details1AndIcon'>
                  <div className="house-details-1">
                      <h3>{property.address}</h3>
                      <h5>{property.city}, {property.state}</h5>
                  </div>
                </div>
                <hr></hr>
                <div className="house-details-2">
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
                </div>
                <hr></hr>
                <Link to={`/my-properties/${property._id}`}>Go to Property <i class="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </div>
          ))
        }

        {
          properties.length == 0 && <div style={{ height: "10.6rem", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <h1 style={{ fontWeight: 400 , fontSize: "3rem"}}>No properties found !!</h1>
            <button style={{ padding: "8px 25px", fontSize:"20px"}} onClick={handleSaleBtn}>Sale one <i class="fa-solid fa-arrow-right" style={{  fontSize:"15px"}}></i></button>
            </div>
        }
      </div>
      </div>
      {
        properties.length>0 && <Footer/>
      }
    </div>
  )
}

export default MyProperties
