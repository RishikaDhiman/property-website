import React, { useRef } from 'react'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sale = () => {

  const {id} = useParams();

  const apiUrl = id ? `${process.env.REACT_APP_BACKEND_URL}/my-properties/${id}` : `${process.env.REACT_APP_BACKEND_URL}/sale-property`;
  const method = id ? 'PATCH' : 'POST';

  const address = useRef(null);
  const city = useRef(null);
  const state = useRef(null);
  const price = useRef(null);
  const bedrooms = useRef(null);
  const bathrooms = useRef(null);
  const hospitals = useRef(null);
  const colleges = useRef(null);

  const navigate = useNavigate();

  const handleSubmit =async()=>{

    console.log("apiurllllllllllllllllllllllll",apiUrl)
    const token = localStorage.getItem("token")
    const response = await fetch(apiUrl,{
      method: method,
      headers : {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify({
        address : address.current.value,
        city : city.current.value,
        state : state.current.value,
        price : price.current.value,
        bedrooms : bedrooms.current.value,
        bathrooms : bathrooms.current.value,
        hospitals : hospitals.current.value,
        colleges : colleges.current.value,
      })
    });

    const data = await response.json();
    console.log(data);

    if(response.status == "201"){
      if(!id){
        toast.success(data);
      }
      else{
        toast.success("Successfully Edited");
      }
      
      navigate("/my-properties")
    }
    else{
      toast.error(data);
    }

  }

  return (
    
    <div className='Sale'>
        <Header/>
        <div className='sale-container'>
        <h1>LET'S {id?"EDIT":"SALE"} YOUR PROPERTY</h1>
        <h2>ENTER DETAILS ABOUT YOUR PROPERTY</h2>
        <form onSubmit={(e)=>e.preventDefault()} className='sale-form'>
            <input type="text" placeholder='Enter Address' ref={address}></input>
            <div className="sale-form-box">
              <input type="text" placeholder='Enter City' ref={city}></input>
              <input type="text" placeholder='Enter State' ref={state}></input>
            </div>
            <input type="text" placeholder='Enter Price in dollars' ref={price}></input>
            <div className="sale-form-box">
              <input type="number" placeholder='Enter no. of bedrooms' ref={bedrooms}></input>
              <input type="number" placeholder='Enter no. of bathrooms' ref={bathrooms}></input>
            </div>
            <div className="sale-form-box">
              <input type="number" placeholder='Enter no. of hospitals nearby' ref={hospitals}></input>
              <input type="number" placeholder='Enter no. of colleges nearby' ref={colleges}></input>
            </div>
            <button onClick={handleSubmit}>Post</button>
        </form>
        </div>
    </div>

  )
}

export default Sale
