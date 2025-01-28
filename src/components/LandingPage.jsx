import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Solid icons
import {
	faRocket,
	faPaintBrush,
	faCode,
	faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import "../css/landingPage.css";
import SideImage from "../images/ai.png";
import NavbarIcon from "../images/main.png";

const LandingPage = () => {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate("/dashboard");
	}, [isAuthenticated, navigate]);

	if (isLoading) return <div className="text-center p-5">Loading...</div>;

	return (
		<div className="landing-page">
			{/* Navbar */}
			<Navbar bg="white" fixed="top" className="border-bottom py-3">
				<Container className="d-flex align-items-center">
					<Navbar.Brand className="fw-bold fs-3 text-dark me-auto">
						<img
							src={NavbarIcon}
							height="40rem"
							width="40rem"
							alt=""
							className="rounded"
						/>{" "}
						InsightSurveyAI
					</Navbar.Brand>
					<button
						className="btn navbarStartButton px-4 py-2 fw-bold"
						onClick={() => loginWithRedirect()}
						style={{ borderRadius: "8px", width: "10rem" }}
					>
						Start for Free
					</button>
				</Container>
			</Navbar>

			<section className="hero-section" style={{ paddingTop: "120px" }}>
				<Container className="py-5">
					<h1 className="display-4 fw-bold text-center mb-4">
						Build Insightful <span>AI Powered</span> <br />
						User Surveys
					</h1>
					<p className="lead text-center text-muted mb-5">
						Broad Engagement, Talent Questions, Gain Actionable Insights
					</p>

					{/* Survey Creation Form */}
					<Row className="survey-form g-3 justify-content-center mb-6">
						<Col md={8} lg={6}>
							<Form.Control
								placeholder="What is the topic of your survey?"
								className="form-control-lg border-1 py-3"
							/>
						</Col>
						<Col md="auto">
							<button
								className="btn heroSectionCreateSurveyButton btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center"
								onClick={() => loginWithRedirect()}
							>
								<FontAwesomeIcon icon={faRocket} className="me-3" />
								Create Survey
							</button>
						</Col>
					</Row>

					<img
						src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
						alt="AI Analytics"
						className="img-fluid rounded-4 shadow-lg"
					/>
				</Container>
			</section>

			{/* Steps Section */}
			<section className="steps-section bg-light py-6">
				<Container>
					<Row className="g-5 align-items-center">
						<Col md={6}>
							<h2 className="text-center fw-bold mb-6 display-5">
								How to generate your survey in minutes with AI
							</h2>
							{[1, 2, 3, 4].map((step) => (
								<div key={step} className="d-flex align-items-start mb-4">
									<div className="step-number text-white rounded-3 d-flex align-items-center justify-content-center me-4">
										{step}
									</div>
									<p className="h5 mb-0 text-muted">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
										do eiusmod tempor incididunt ut labore.
									</p>
								</div>
							))}
						</Col>
						<Col md={6} className="text-center order-md-2">
							{" "}
							{/* Added order and text-center */}
							<img
								src={SideImage}
								alt="Steps Visual"
								className="img-fluid rounded-4 shadow mx-auto"
								style={{ maxWidth: "90%" }}
							/>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className="features-section py-6">
				<Container>
					<div className="mb-6 text-center">
						<h2 className="display-5 fw-bold mb-3">
							InsightSurvey AI is designed for everyone
						</h2>
						<p className="lead text-muted">
							Use for whatever you want, it's completely free!
						</p>
					</div>

					<Row className="g-4">
						{[
							{
								icon: faPaintBrush,
								title: "For Designers",
								text: "Develop user-level solutions that reduce potential damage",
							},
							{
								icon: faCode,
								title: "For Coders",
								text: "Design users from full-time technology needed training",
							},
							{
								icon: faUserTie,
								title: "For Managers",
								text: "Learn how many designers can be trained on their own",
							},
						].map((feature, index) => (
							<Col lg={4} key={index}>
								<div className="feature-card h-100 p-5 rounded-4 position-relative">
									<div className="icon-wrapper bg-primary-soft p-4 mb-4 rounded-3 transition-all">
										<FontAwesomeIcon icon={feature.icon} size="2x" />
									</div>
									<h3 className="h4 fw-bold mb-3">{feature.title}</h3>
									<p className="mb-0">{feature.text}</p>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Final CTA Section */}
			<section className="cta-section py-6">
				<Container className="text-center">
					<div className="mb-4">
						<h2 className="display-5 fw-bold mb-4">
							Unlock the <span className="highlight-text">Power of AI</span> for
							Free!
						</h2>
						<p className="lead text-muted">
							Discover how our AI tool can transform your workflow and boost
							productivity. <br /> Sign up today and experience the benefits
							firsthand.
						</p>
						<button
							className="btn btn-light btn-lg px-6 py-3 fw-bold"
							onClick={() => loginWithRedirect()}
							style={{ width: "15rem" }}
						>
							Start For Free
						</button>
					</div>
				</Container>
			</section>

			{/* Footer */}
			<footer className="footer text-white py-6">
				<Container>
					<Row className="g-5">
						<Col lg={12}>
							<h5 className="fw-bold mb-4">InsightSurvey.ai</h5>
							<p className=" text-white">
								Boost engagement and response rates with AI-personalized
								surveys. Tailor questions to individual preferences for relevant
								insights and actionable data. Enjoy dynamic, user-friendly
								surveys that adapt in real-time.
							</p>
						</Col>
					</Row>
				</Container>
			</footer>
		</div>
	);
};

export default LandingPage;
