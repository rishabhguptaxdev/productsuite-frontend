import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/landingPage.css";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect authenticated users to dashboard
    }
  }, [isAuthenticated, navigate]);

  if(isLoading && !isAuthenticated){
	return <div>Loading...</div>;
  }


  return (
    !isAuthenticated && (
      <div className="landing-container">
        <h1>Welcome to Interactive Survey</h1>
        <div className="button-group">
          <Link onClick={() => loginWithRedirect()}>Enter into APP</Link>
        </div>
      </div>
    )
  );
};

export default LandingPage;
