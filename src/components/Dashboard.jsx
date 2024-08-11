import React, { useState } from "react";
import "../css/dashboard.css";
import CreateSurvey from "./CreateSurvey";
import MySurveys from "./MySurveys";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBolt,
	faArrowRightFromBracket,
	faFileLines,
	faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import main from "../images/main.png";

function Dashboard({ initialView }) {
	const [view, setView] = useState(initialView || "create");
	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(logout());
	};

	const handleViewChange = (newView) => {
		setView(newView);
	};

	return (
		<div className="dashboard">
			<header>
				<div className="logo-container">
					{/* <FontAwesomeIcon icon={faBolt} size="xl" /> InsightSurvey.ai */}
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
						Logout{" "}
						<FontAwesomeIcon
							style={{ marginLeft: 10 }}
							icon={faArrowRightFromBracket}
							size="xl"
						/>
					</div>
				</nav>
			</header>
			<div className="main-content">
				<aside className="sidebar">
					<ul>
						<li
							className={view === "create" ? "active" : ""}
							onClick={() => handleViewChange("create")}
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
							onClick={() => handleViewChange("list")}
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
