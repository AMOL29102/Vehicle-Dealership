import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  // Check for the token
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute;
