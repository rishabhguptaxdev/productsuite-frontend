import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import CreateSurvey from "./CreateSurvey";
import MySurveys from "./MySurveys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faFileLines,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import main from "../images/main.png";

function Dashboard({ initialView }) {
  const [view, setView] = useState(initialView || "create");
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
	const fetchToken = async () => {
	  try {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup-login`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		  },
		  body: JSON.stringify({
			email: user.email,
			auth0Id: user.sub,
		  }),
		});
  
		const data = await response.json();
  
		if (response.ok) {
		  localStorage.setItem("token", data.token);
		} else {
		  console.error("Failed to exchange token", data.message);
		  logout({ returnTo: window.location.origin });
		}
	  } catch (error) {
		console.error("Error fetching token:", error);
		logout({ returnTo: window.location.origin });
	  }
	};
  
	if (isAuthenticated && !isLoading) {
	  fetchToken();
	}
  }, [isAuthenticated, isLoading, getAccessTokenSilently, user, logout]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout({ returnTo: window.location.origin });
  };

  return (
      <div className="dashboard">
        <header>
          <div className="logo-container">
            <img
              src={main}
              style={{ height: 30, width: 30, marginRight: 10 }}
              className="rounded float-start img-fluid"
              alt="Main Logo"
            />
            InsightSurvey.ai
          </div>
          <nav>
            <div className="account-icon" onClick={handleLogout}>
              Logout
              <FontAwesomeIcon style={{ marginLeft: 10 }} icon={faArrowRightFromBracket} size="xl" />
            </div>
          </nav>
        </header>
        <div className="main-content">
          <aside className="sidebar">
            <ul>
              <li className={view === "create" ? "active" : ""} onClick={() => setView("create")}>
                <FontAwesomeIcon icon={faFileLines} size="lg" style={{ marginRight: 5 }} />
                Create Survey
              </li>
              <li className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
                <FontAwesomeIcon icon={faSquarePollVertical} size="lg" style={{ marginRight: 5 }} />
                My Surveys
              </li>
            </ul>
          </aside>
          <section className="content">
            {view === "create" && <CreateSurvey />}
            {view === "list" && <MySurveys />}
          </section>
        </div>
      </div>
  );
}

export default Dashboard;
