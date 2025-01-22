import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/dashboard.css";
import CreateSurvey from "./CreateSurvey";
import MySurveys from "./MySurveys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightFromBracket,
	faFileLines,
	faSquarePollVertical,
	faCaretDown,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import main from "../images/main.png";

function Dashboard({ initialView }) {
	const [view, setView] = useState(initialView || "create");
	const [profileImgError, setProfileImgError] = useState(false); // Track image load errors

	const dropdownRef = useRef(null);
	const dropdownMenuRef = useRef(null);

	const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
		useAuth0();
	console.log(user);

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

	const toggleDropdown = () => {
		if (dropdownMenuRef.current) {
			const currentDisplay = dropdownMenuRef.current.style.display;

			if (currentDisplay === "block") {
				dropdownMenuRef.current.style.display = "none";
			} else {
				dropdownMenuRef.current.style.display = "block";
			}
		}
	};

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
					{isAuthenticated && user ? (
						<div className="profile-dropdown" ref={dropdownRef}>
							<div className="profile-toggle" onClick={toggleDropdown}>
								{profileImgError || !user.picture ? (
									<FontAwesomeIcon
										icon={faUser}
										size="xl"
										style={{ marginRight: 10 }}
									/>
								) : (
									<img
										src={user.picture}
										alt="Profile"
										className="profile-image"
										style={{
											height: 30,
											width: 30,
											borderRadius: "50%",
											marginRight: 10,
										}}
										onError={() => setProfileImgError(true)} // Handle broken image fallback
									/>
								)}
								{user.name || "Profile"}
								<FontAwesomeIcon
									icon={faCaretDown}
									size="lg"
									style={{ marginLeft: 5 }}
								/>
							</div>
							<div
								className="dropdown-menu"
								ref={dropdownMenuRef}
								style={{ display: "none" }}
							>
								<div className="dropdown-item" onClick={handleLogout}>
									<FontAwesomeIcon
										style={{ marginRight: 10 }}
										icon={faArrowRightFromBracket}
										size="lg"
									/>
									Logout
								</div>
							</div>
						</div>
					) : (
						<div>Loading...</div>
					)}
				</nav>
			</header>
			<div className="main-content">
				<aside className="sidebar">
					<ul>
						<li
							className={view === "create" ? "active" : ""}
							onClick={() => setView("create")}
						>
							<FontAwesomeIcon
								icon={faFileLines}
								size="lg"
								style={{ marginRight: 5 }}
							/>
							Create Survey
						</li>
						<li
							className={view === "list" ? "active" : ""}
							onClick={() => setView("list")}
						>
							<FontAwesomeIcon
								icon={faSquarePollVertical}
								size="lg"
								style={{ marginRight: 5 }}
							/>
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
