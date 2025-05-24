import "../styles/landingPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRocket,
	faPaintBrush,
	faUserTie,
	faMessage,
	faPencilAlt,
	faRobot,
} from "@fortawesome/free-solid-svg-icons";

import NavbarIcon from "../assets/images/logo.jpeg";
import { TypeAnimation } from "react-type-animation";
import Loader from "../components/Loader";

const SurveyLandingPage = () => {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate("/dashboard");
	}, [isAuthenticated, navigate]);

	if (isLoading)
		return <Loader loadingText={"Redirecting to dashboard..."}></Loader>;

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
						Productsuite<span>.ai</span>
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

			<section className="hero-section py-4">
				<Container className="">
					<h1 className="display-4 fw-bold text-center mb-4">
						From Boring Surveys <br />
						to{" "}
						<TypeAnimation
							sequence={[
								"Conversational Surveys",
								2000,
								"Deep Discoveries",
								2000,
								"Brilliant Insights",
								2000,
							]}
							wrapper="span"
							cursor={true}
							repeat={Infinity}
							style={{ display: "inline-block" }}
							className="type-animation"
						/>
					</h1>
					<p className="lead text-center text-muted mb-4">
						Let AI ask the right questions personalised to each user, uncovering
						insights you never knew existed.
					</p>

					<Row className="survey-form g-3 justify-content-center">
						<Col md={8} lg={6}>
							<Form.Control
								placeholder="What is the topic of your survey?"
								className="form-control-lg border-1"
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
				</Container>
			</section>

			{/* New Steps Cards Section */}
			<section className="steps-cards py-6">
				<Container>
					<div className="mb-6 text-center">
						<h2 className="display-5 fw-bold mb-3">How It Works</h2>
					</div>
					<Row className="g-4">
						{[
							{
								icon: faPencilAlt,
								title: "Enter your survey topic",
								text: "Tell AI what the survey is about. Whether it's customer feedback, market research, or employee satisfaction - just describe your goal.",
							},
							{
								icon: faMessage,
								title: "Write your first question",
								text: "Enter the question that kicks off the conversation. Our AI will build everything else from there.",
							},
							{
								icon: faRobot,
								title: "Let our AI handle the rest",
								text: "Watch as our AI turns each survey into a unique conversation, asking the perfect follow-up questions.",
							},
						].map((step, index) => (
							<Col lg={4} key={index}>
								<div className="step-card h-100 p-5 rounded-4 text-center">
									<div className="icon-wrapper p-4 bg-primary-grey mb-4 rounded-4 mx-auto">
										<FontAwesomeIcon icon={step.icon} size="2x" />
									</div>
									<h3 className="h4 fw-bold mb-3">{step.title}</h3>
									<p className="text-muted mb-0">{step.text}</p>
								</div>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className="features-section py-6">
				<Container>
					<div className="mb-6 text-center">
						<h2 className="display-5 fw-bold mb-3">
							Productsuite AI is designed for everyone
						</h2>
						<p className="lead text-muted">
							Use for whatever you want, it's completely free!
						</p>
					</div>

					<Row className="g-4">
						{[
							{
								icon: faUserTie,
								title: "Product Managers",
								text: "Need to understand why users love (or leave) your product? Create surveys which will tell you exactly why.",
							},
							{
								icon: faPaintBrush,
								title: "Designers",
								text: "Tired of shallow usability feedback? Create surveys that adapt to each user's experience, revealing the real story behind every interaction.",
							},
							{
								icon: faRocket,
								title: "Founders",
								text: "Making big decisions? Stop guessing what your market wants. Let AI turn every survey into a meaningful customer conversation that shapes your strategy.",
							},
						].map((feature, index) => (
							<Col lg={4} key={index}>
								<div className="feature-card h-100 p-5 rounded-4 text-center position-relative">
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
							<h5 className="fw-bold mb-4">Productsuite.ai</h5>
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

export default SurveyLandingPage;
