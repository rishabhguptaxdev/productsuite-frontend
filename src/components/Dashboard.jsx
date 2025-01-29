import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faFileLines,
	faSquarePollVertical,
	faCaretDown,
	faUser,
	faCaretLeft,
	faBars,
} from "@fortawesome/free-solid-svg-icons";
import main from "../images/main.png";
import {
	activateCreateSurveyComponent,
	activateMySurveysComponent,
} from "../redux/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateSurvey from "./CreateSurvey";
import MySurveys from "./MySurveys";
import ViewResponses from "./ViewResponses";
import SurveyCreated from "./SurveyCreated";
import "../css/dashboard.css";

function Dashboard() {
	const [profileImgError, setProfileImgError] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);
	const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
		useAuth0();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [dropdownRef]);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const accessToken = await getAccessTokenSilently();
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}/auth/signup-login`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify({
							email: user.email,
							auth0Id: user.sub,
						}),
					}
				);
				if (response.ok) {
					const data = await response.json();
					localStorage.setItem("token", data.token);
				}
			} catch (error) {
				console.error("Error fetching token:", error);
			}
		};
		if (isAuthenticated && !isLoading && user) fetchToken();
	}, [isAuthenticated, isLoading, getAccessTokenSilently, user]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		logout({ returnTo: window.location.origin });
	};

	return (
		<div className="dashboard">
			<aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
				<div className="sidebar-header">
					<div className="logo-container">
						<img src={main} alt="Logo" className="logo" />
						<span className="logo-text">InsightSurvey.ai</span>
						<button
							className="sidebar-toggle"
							onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
						>
							<FontAwesomeIcon
								icon={isSidebarCollapsed ? faBars : faCaretLeft}
								className="toggle-icon"
							/>
						</button>
					</div>
				</div>

				<nav className="sidebar-nav">
					<ul>
						<li
							className={
								useSelector((state) => state.dashboard.showCreateSurvey)
									? "active"
									: ""
							}
							onClick={() => dispatch(activateCreateSurveyComponent())}
						>
							<FontAwesomeIcon icon={faFileLines} />
							<span>Create Survey</span>
						</li>
						<li
							className={
								useSelector((state) => state.dashboard.showMySurveys)
									? "active"
									: ""
							}
							onClick={() => dispatch(activateMySurveysComponent())}
						>
							<FontAwesomeIcon icon={faSquarePollVertical} />
							<span>My Surveys</span>
						</li>
					</ul>
				</nav>

				<div className="sidebar-profile">
					{isAuthenticated && user && (
						<div className="profile-dropdown" ref={dropdownRef}>
							<div
								className="profile-toggle"
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							>
								{profileImgError || !user.picture ? (
									<FontAwesomeIcon icon={faUser} />
								) : (
									<img
										src={user.picture}
										alt="Profile"
										className="profile-image"
										onError={() => setProfileImgError(true)}
									/>
								)}
								{!isSidebarCollapsed && (
									<>
										<span>{user.name || "Profile"}</span>
										<FontAwesomeIcon icon={faCaretDown} />
									</>
								)}
							</div>
							<div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
								<div className="dropdown-item" onClick={handleLogout}>
									<FontAwesomeIcon icon={faArrowRightFromBracket} />
									<span>Logout</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</aside>

			<main className="main-content">
				<section className="content">
					{useSelector((state) => state.dashboard.showCreateSurvey) && (
						<CreateSurvey />
					)}
					{useSelector((state) => state.dashboard.showMySurveys) && (
						<MySurveys />
					)}
					{useSelector((state) => state.dashboard.showViewResponse) && (
						<ViewResponses />
					)}
					{useSelector((state) => state.dashboard.showSurveyCreated) && (
						<SurveyCreated />
					)}
				</section>
			</main>
		</div>
	);
}

export default Dashboard;
