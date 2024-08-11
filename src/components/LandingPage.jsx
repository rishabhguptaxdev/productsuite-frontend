import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/landingPage.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

const LandingPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(login(localStorage.getItem("token")));
			navigate("/dashboard");
		}
	});

	return (
		<div className="landing-container">
			<h1>Welcome to Interactive Survey</h1>
			<div className="button-group">
				<Link to="/login">Login</Link>
				<Link to="/signup">Signup</Link>
			</div>
		</div>
	);
};

export default LandingPage;
