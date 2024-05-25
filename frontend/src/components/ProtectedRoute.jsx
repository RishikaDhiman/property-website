import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    
    const token = localStorage.getItem("token");
  console.log("protected routeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    return (token && token!=null ? 
    <Outlet/>
    : <Navigate to="/login"></Navigate>)
    
    
}

export default ProtectedRoute