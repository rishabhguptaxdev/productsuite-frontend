import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/take_survey.css";
import Loader from "./Loader";
const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

function TakeSurvey() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [survey, setSurvey] = useState(null);
	const [responses, setResponses] = useState([]);
	const [isLastResponse, setIsLastResponse] = useState(false);
	const [nextQuestionFetched, setNextQuestionFetched] = useState(true);
	const hasFetched = useRef(false);

	const fetchSurvey = async () => {
		const getLoggerId = async () => {
			try {
				const responseResponse = await axios.post(
					`${backendbaseurl}/response/getLoggerId/${id}`
				);
				sessionStorage.setItem("loggerId", responseResponse.data.loggerId);
			} catch (error) {
				console.error("Error fetching loggerId:", error);
			}
		};
		try {
			const surveyResponse = await axios.get(`${backendbaseurl}/survey/${id}`, {
				params: {
					surveyId: id,
				},
			});
			setSurvey(surveyResponse.data);
			if (surveyResponse?.data?.isClosed) {
				return;
			}
			const initialResponses = surveyResponse.data.questions.map(
				(q) => q.response || ""
			);
			setResponses(initialResponses);
			await getLoggerId();
		} catch (error) {
			console.error("Error fetching survey:", error);
		}
	};

	const getIncompleteSurvey = async (loggerId) => {
		try {
			const surveyResponse = await axios.get(
				`${backendbaseurl}/response/${loggerId}`,
				{
					params: {
						surveyId: id,
					},
				}
			);
			const surveyData = {
				...surveyResponse.data,
				...surveyResponse?.data?.surveyId,
			};
			setSurvey(surveyData);
			const savedResponses = surveyData.questions.map((q) => q.response || "");
			setResponses(savedResponses);
			setIsLastResponse(
				surveyData.max_questions === surveyData.questions.length
			);
			if (
				surveyData.max_questions === surveyData.questions.length &&
				surveyData.questions[surveyData.max_questions - 1].response
			) {
				navigate("/thank-you");
			}
		} catch (error) {
			console.error("Error fetching incomplete survey:", error);
		}
	};

	const handleInputChange = (value, index) => {
		const newResponses = [...responses];
		newResponses[index] = value;
		setResponses(newResponses);
	};

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		if (sessionStorage.getItem("loggerId")) {
			getIncompleteSurvey(sessionStorage.getItem("loggerId"));
		} else {
			fetchSurvey();
		}
	});

	const saveResponses = async () => {
		try {
			const res = await axios.post(
				`${backendbaseurl}/response/${sessionStorage.getItem("loggerId")}`,
				{
					responses: responses,
				}
			);
			return { ...res.data, ...res.data.surveyId };
		} catch (error) {
			console.error("Error saving responses:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Disable the button before the request starts
		setNextQuestionFetched(false);
		console.log("Fetching next question, disabling the Next/Submit button...");

		try {
			// Save responses and fetch the next question
			const data = await saveResponses();

			// Update survey and responses with the new data
			const surveyData = {
				...data.updatedSurvey,
				...data?.updatedSurvey?.surveyId,
			};
			setSurvey(surveyData);

			// Update responses
			const newResponses = data?.updatedSurvey.questions.map(
				(q) => q.response || ""
			);
			setResponses(newResponses);

			// Update isLastResponse
			setIsLastResponse(data?.isLastResponse);

			// Redirect if the survey is completed
			if (data?.isSurveyCompleted) {
				navigate("/thank-you");
			}
		} catch (error) {
			console.error("Error handling submit:", error);
		} finally {
			// Re-enable the button after the response is fetched
			setNextQuestionFetched(true);
			console.log("Next question fetched, enabling the Next/Submit button...");
		}
	};

	if (survey?.isClosed)
		return (
			<div>
				<h1 style={{ textAlign: "center", margin: 10 }}>
					This survey has been closed
				</h1>
			</div>
		);

	if (!survey) return <Loader />;

	return (
		<div className="survey-container">
			<h1>{survey.title}</h1>
			<p>{survey.description || "des"} </p>
			<form onSubmit={handleSubmit}>
				{survey.questions.map((q, index) => (
					<div key={index} className="question-block">
						<label>{q.question}</label>
						<input
							type="text"
							name={`response_${index}`}
							value={responses[index]}
							placeholder="Your answer"
							disabled={!!q.response}
							onChange={(e) => handleInputChange(e.target.value, index)}
							required
						/>
					</div>
				))}
				<button
					type="submit"
					id="actionBtn"
					disabled={
						!nextQuestionFetched ||
						responses.some((response) => response === "")
					}
				>
					{isLastResponse ? "Submit" : "Next"}
				</button>
			</form>
		</div>
	);
}

export default TakeSurvey;
