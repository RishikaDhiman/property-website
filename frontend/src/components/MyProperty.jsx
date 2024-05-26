import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const MyProperty = () => {

    const navigate =  useNavigate();

  const [property, setProperty] = useState(null);

  const { id } = useParams(); 
  const token = localStorage.getItem("token")

  const fetchData = async()=>{

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-properties/${id}`,{
      method : "GET",
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });
      
    const data = await response.json();
    console.log(data);

    setProperty(data);

  }


  useEffect(()=>{
    fetchData();
  },[id]);

  const deleteButton = async()=>{

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-properties/${id}`,{
        method : "DELETE",
        headers : {
          "Authorization" : `Bearer ${token}`
        }
    });
      
    const data = await response.json();

    if (response.status === 201) {
        toast.success("Successfully Deleted");
        navigate("/my-properties");
    } else {
        toast.error("Failed to delete property");
    }

    navigate("/my-properties");
  }

  const editButton =()=>{
    navigate(`/my-property/${id}`)
  }



  return (
    <div >

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
          
          <div className='editAndDelete'>
            <button onClick={editButton}>Edit</button>
            <button onClick={deleteButton}>Delete</button>
          </div>
          <hr></hr>
          
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MyProperty
