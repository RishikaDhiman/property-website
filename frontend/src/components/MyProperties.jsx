import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom';

const MyProperties = () => {

  const [properties, setProperties] = useState([]);

  const fetchData = async()=>{

    const token = localStorage.getItem("token")

    const response = await fetch(`http://localhost:3000/my-properties`,{
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


  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <div>
      <Header/>
      <div className='MyProperty'>
        <h1>My Properties</h1>
        <hr></hr>

        <div className='All-properties'>
        {
          properties.length>0 && properties.map((property)=>(
            <div className="house-card" key={property._id}>
                <img src="https://static.wixstatic.com/media/84770f_ca6a1aafafa04284a052e09b53a0fce9~mv2_d_3456_2304_s_2.jpeg/v1/fill/w_435,h_260,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image-place-holder.jpeg"/>
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
          properties.length == 0 && <div><h1 style={{ fontWeight: 400 , fontSize: "3rem"}}>No properties found !!</h1></div>
        }
      

      </div>

      </div>
    </div>
  )
}

export default MyProperties
