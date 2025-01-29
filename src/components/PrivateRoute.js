// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <Loader />;
	}

	return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
