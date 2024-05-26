import React from 'react'
import { useNavigate } from 'react-router-dom'

const Body = () => {

  const navigate = useNavigate();

  const handleClick=()=>{
    navigate("/buy")
  }

  return (
    <div className='Body'>
      <div className='Body-content'>
        <h1>NEW PROPERTIES</h1>
        <h2>EXCLUSIVELY BY REACTESTATE</h2>
        <div>
        <button onClick={handleClick}>EXPLORE</button>
        </div>
      </div>
    </div>
  )
}

export default Body
