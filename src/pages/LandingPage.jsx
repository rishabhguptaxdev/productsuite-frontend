import "../styles/landingPage.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRocket,
	faUserTie,
	faMessage,
	faUpload,
	faShareAlt,
	faArrowTrendUp,
	faHeadset,
} from "@fortawesome/free-solid-svg-icons";

import NavbarIcon from "../assets/images/logo.jpeg";
import { TypeAnimation } from "react-type-animation";
import Loader from "../components/Loader";

const LandingPage = () => {
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
						From static documents <br />
						to{" "}
						<TypeAnimation
							sequence={[
								"Smart Assistants",
								2000,
								"Instant Answers",
								2000,
								"Smarter Teams",
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
						No more hunting through documents - AI delivers instant answers to
						your support and sales teams.
					</p>

					<Row className="survey-form g-3 justify-content-center">
						{/* <Col md={8} lg={6}>
							<Form.Control
								placeholder="Upload Your PDF..."
								className="form-control-lg border-1"
							/>
						</Col> */}
						<Col md="auto">
							<button
								className="btn heroSectionCreateSurveyButton btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center"
								onClick={() => loginWithRedirect()}
							>
								<FontAwesomeIcon icon={faRocket} className="me-3" />
								Create Your Bot
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
								icon: faUpload,
								title: "Upload your documents",
								text: "Upload your manuals, FAQs, policies, and training materials. Whether it's product documentation, customer support guides, or sales playbooks - just add your existing documents and let our AI understand your content.",
							},
							{
								icon: faMessage,
								title: "AI Builds Your Expert Bot",
								text: "Our advanced AI doesn't just read your content - it understands it. Within seconds, you'll have an intelligent bot that knows your products, policies, and processes inside out, ready to provide accurate, contextual answers to your questions.",
							},
							{
								icon: faShareAlt,
								title: "Deploy Across Your Organization",
								text: "Generate secure, shareable links or embed directly into your workflow. Support agents get instant answers to customer queries, sales teams access product details on-demand - all without digging through endless documents.",
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
							Empower your teams with instant access to knowledge, completely
							free!
						</p>
					</div>

					<Row className="g-4">
						{[
							{
								icon: faUserTie,
								title: "Product Managers",
								text: "Share product documentation, feature specs, and roadmaps with your sales and support teams. Create knowledge bots that help teams understand product details instantly.",
							},
							{
								icon: faArrowTrendUp,
								title: "Sales Teams",
								text: "Access product information, pricing details, and competitive analysis instantly. Get accurate answers to customer questions without digging through multiple documents.",
							},
							{
								icon: faHeadset,
								title: "Customer Support",
								text: "Resolve customer queries faster with instant access to product knowledge. Let AI help you find the right information from documentation and support materials.",
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
								Transform your PDFs into intelligent knowledge bots that teams
								can interact with. Perfect for product managers sharing
								documentation with sales and support teams. Get instant answers,
								improve team efficiency, and make knowledge accessible to
								everyone.
							</p>
						</Col>
					</Row>
				</Container>
			</footer>
		</div>
	);
};

export default LandingPage;
