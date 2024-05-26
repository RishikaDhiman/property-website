import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    
    const token = localStorage.getItem("token");
    return (token && token!=null ? 
    <Outlet/>
    : <Navigate to="/"></Navigate>)
    
    
}

export default ProtectedRoute