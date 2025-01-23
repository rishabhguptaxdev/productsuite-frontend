import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/landingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRocket,
	faChartLine,
	faLock,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard"); // Redirect authenticated users to dashboard
		}
	}, [isAuthenticated, navigate]);

	if (isLoading && !isAuthenticated) {
		return <div className="loader">Loading...</div>;
	}

	return (
		<div className="dark-landing-container">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-title">Welcome to Insight Survey</h1>
					<p className="hero-subtitle">
						Smarter surveys. Actionable insights. All in one place.
					</p>
					<button
						className="btn btn-primary btn-lg"
						onClick={() => loginWithRedirect()}
					>
						<FontAwesomeIcon icon={faRocket} className="me-2" />
						Start
					</button>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<h2 className="section-title">Features</h2>
				<div className="features-grid">
					<div className="feature-card">
						<FontAwesomeIcon
							icon={faChartLine}
							size="3x"
							className="feature-icon"
						/>
						<h3>Advanced Analytics</h3>
						<p>
							Visualize and interpret survey results with actionable insights.
						</p>
					</div>
					<div className="feature-card">
						<FontAwesomeIcon icon={faLock} size="3x" className="feature-icon" />
						<h3>Data Security</h3>
						<p>
							Secure and encrypted data handling to keep your information safe.
						</p>
					</div>
					<div className="feature-card">
						<FontAwesomeIcon
							icon={faUsers}
							size="3x"
							className="feature-icon"
						/>
						<h3>Team Collaboration</h3>
						<p>Work with your team to create impactful surveys.</p>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="testimonials-section">
				<h2 className="section-title">What Our Users Say</h2>
				<div className="testimonials-grid">
					<div className="testimonial-card">
						<p>
							"Insight Survey is a game-changer! The analytics helped us make
							better decisions."
						</p>
						<h4>- Jane Doe</h4>
					</div>
					<div className="testimonial-card">
						<p>
							"Amazing tool! It's simple, secure, and delivers exactly what we
							need."
						</p>
						<h4>- John Smith</h4>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="cta-section">
				<h2 className="cta-title">Get Started Today</h2>
				<p className="cta-subtitle">
					Join thousands of professionals using Insight Survey.
				</p>
				<button
					className="btn btn-primary btn-lg"
					onClick={() => loginWithRedirect()}
				>
					Sign Up
				</button>
			</section>

			{/* Footer */}
			<footer className="dark-footer">
				<p>© {new Date().getFullYear()} Insight Survey. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
