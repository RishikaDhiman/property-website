import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const BuyOrSale = () => {
  return (
    <div className='BuyOrSale'>
      <h1>WHAT ARE YOU LOOKING FOR ?</h1>
      <div className='BuyOrSale-Container'>
        <div className='buy-box'>
          <h1><Link to="/buy">BUY</Link></h1>
        </div>
        <div className='sale-box'>
        <h1><Link to="/buy">RENT</Link></h1>
        </div>
      </div>
    </div>
  )
}

export default BuyOrSale
