import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Don't render anything or redirect until Auth0 finishes loading
  if (isLoading) {
    return <Loader />;
  }

  // Once loading is complete, check if user is authenticated
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
