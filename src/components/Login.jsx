import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

import "../css/auth.css";
const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(login(localStorage.getItem("token")));
			navigate("/dashboard");
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Call the login API
		const response = await fetch(`${backendbaseurl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const { jwtToken } = await response.json();
			localStorage.setItem("token", jwtToken);
			dispatch(login(jwtToken));
			navigate("/dashboard");
		} else {
			// Handle login error
		}
	};

	return (
		<div className="auth-container">
			<h2>Login</h2>
			<form className="auth-form" onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
				<Link to="/signup">Don't have an account? Signup</Link>
			</form>
		</div>
	);
};

export default Login;
