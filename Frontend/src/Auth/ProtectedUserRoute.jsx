// src/Auth/ProtectedUserRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedUserRoute = ({ children, requiredRoles }) => {
  const navigate = useNavigate();
  console.log(requiredRoles)

  const token = localStorage.getItem("authToken");
  let decodedToken;
  if (token) {
    try {
       decodedToken = jwtDecode(token);
  console.log(decodedToken);

    } catch (error) {
      console.error("Invalid token", error);
     
    }
  }

  useEffect(() => {
    if (!decodedToken || (requiredRoles && !requiredRoles.some(role => 
        (role === "driver" && decodedToken.isDriver) || (role === "admin" && decodedToken.isAdmin) || (role === "employee" && decodedToken.isEmployee)
      ))) {
      navigate("/admin"); // Redirect to /admin if not authorized
    }
  }, [token, requiredRoles, navigate]);

  return token ? children : null; // Render children if authorized
};

export default ProtectedUserRoute;

