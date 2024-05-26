import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

  const handleSignOut =()=>{
    localStorage.removeItem("token");
  }


  return (
    <div className='Header'>
        <h1>Rentify.com</h1>
      <ul>
        <li><Link to="/homepage">Home</Link></li>
        <li><Link to="/buy">Buy</Link></li>
        <li><Link to="/sale">Rent</Link></li>
        <li><Link to="/my-properties">My Properties</Link></li>
        <li><Link to="/" onClick={handleSignOut}>Sign out</Link></li>
      </ul>
    </div>
  )
}

export default Header;
