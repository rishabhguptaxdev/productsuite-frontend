import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../css/thank_you.css";
import GreenTick from "../images/svgs/tickMark.svg";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

const ThankYouPage = () => {
	const [rating, setRating] = useState(0);
	const [hoveredStar, setHoveredStar] = useState(0);
	const [feedback, setFeedback] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const saveSurveyExperience = async () => {
		try {
			const res = await axios.patch(
				`${backendbaseurl}/response/surveyExperience`,
				{
					surveyResponseId: sessionStorage.getItem("loggerId"),
					rating,
					comments: feedback,
				}
			);

			if (res.status === 200) {
				console.log("submitted");
				setIsSubmitted(true);
			}
		} catch (error) {
			console.error("Error saving responses:", error);
		}
	};

	return (
		<div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 bg-white">
			<div className="w-100" style={{ maxWidth: "42rem" }}>
				{/* Thank you message */}
				<div className="text-center mb-5">
					<h1 className="display-4 fw-bold mb-3">
						Thank you for your responses!
					</h1>
					<p className="lead text-muted">
						We appreciate your time and effort in completing the survey.
					</p>
				</div>

				{/* Rating and Feedback Section */}
				<div className="mb-5">
					{!isSubmitted ? (
						<>
							{/* Star Rating */}
							<div className="text-center mb-4">
								<p className="fw-medium mb-3">How was your experience?</p>
								<div className="d-flex justify-content-center">
									{[1, 2, 3, 4, 5].map((star) => (
										<button
											key={star}
											onClick={() => setRating(star)}
											onMouseEnter={() => setHoveredStar(star)}
											onMouseLeave={() => setHoveredStar(0)}
											className="btn btn-link p-0 mx-1"
										>
											<FontAwesomeIcon
												icon={faStar}
												className={`fa-2x ${
													star <= (hoveredStar || rating)
														? "text-warning"
														: "text-muted"
												}`}
											/>
										</button>
									))}
								</div>
							</div>

							{/* Feedback Text Area - Only shown after rating */}
							{rating > 0 && (
								<div className="mb-4 fade-in">
									<p className="fw-medium mb-2">Any additional feedback?</p>
									<textarea
										className="form-control"
										rows="4"
										placeholder="Share your thoughts with us..."
										value={feedback}
										onChange={(e) => setFeedback(e.target.value)}
									/>
								</div>
							)}

							{/* Only show submit button if there's a rating */}
							{rating > 0 && (
								<button
									onClick={saveSurveyExperience}
									className="btn btn-dark w-100 py-2 fade-in"
								>
									Submit Feedback
								</button>
							)}
						</>
					) : (
						<div className="text-center">
							<img
								src={GreenTick}
								alt="Success"
								className="tick-mark me-2"
								width="100"
								height="100"
							/>
							<div className="text-center p-10 fade-in-up d-flex align-items-center justify-content-center">
								<span className="fw-large">
									Your feedback is valuable to us
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Product Suite Promotion */}
				<div className="text-center">
					<hr className="my-5" />
					<div className="bg-light p-4 rounded-3">
						<p className="mb-3">Create your own AI powered survey</p>
						<button
							className="btn btn-dark py-2 px-4"
							onClick={() =>
								window.open(process.env.REACT_APP_FRONTEND_URL, "_blank")
							}
						>
							Create Free Survey
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
