// components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../src/components/Loader";
import MobileWarning from "./pages/MobileWarning";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth0();
	const [isMobile, setIsMobile] = useState(false);
	const [warningDismissed, setWarningDismissed] = useState(false); // Changed initial state
	const location = useLocation();

	useEffect(() => {
		if (isAuthenticated) {
			// Check localStorage first
			const dismissed =
				localStorage.getItem("mobileWarningDismissed") === "true";
			setWarningDismissed(dismissed);

			// Enhanced mobile detection
			const isMobileDevice =
				(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				) ||
					window.matchMedia("(pointer:coarse)").matches) &&
				window.innerWidth < 1024;

			setIsMobile(isMobileDevice);
		}
	}, [isAuthenticated, location.pathname]);

	if (isLoading) {
		return <Loader />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	// Show warning only if mobile and not dismissed
	if (isMobile && !warningDismissed) {
		return <MobileWarning onProceed={() => setWarningDismissed(true)} />;
	}

	return children;
};

export default PrivateRoute;
