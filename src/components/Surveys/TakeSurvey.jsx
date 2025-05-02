import "../../styles/surveys/take_survey.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { surveyService } from "../../services/surveyService";

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
				const responseResponse = await surveyService.getLoggerId(id);
				sessionStorage.setItem("loggerId", responseResponse.data.loggerId);
			} catch (error) {
				console.error("Error fetching loggerId:", error);
			}
		};
		try {
			const surveyResponse = await surveyService.getSurveyResponse(id);
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
			const surveyResponse = await surveyService.getSurveyByLoggerId(loggerId);
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
			const loggerId = sessionStorage.getItem("loggerId");
			const res = surveyService.saveResponse(loggerId, responses);
			return { ...res.data, ...res.data.surveyId };
		} catch (error) {
			console.error("Error saving responses:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setNextQuestionFetched(false);
		console.log("Fetching next question, disabling the Next/Submit button...");

		try {
			const data = await saveResponses();

			const surveyData = {
				...data.updatedSurvey,
				...data?.updatedSurvey?.surveyId,
			};
			setSurvey(surveyData);

			const newResponses = data?.updatedSurvey.questions.map(
				(q) => q.response || ""
			);
			setResponses(newResponses);

			setIsLastResponse(data?.isLastResponse);

			if (data?.isSurveyCompleted) {
				navigate("/thank-you");
			}
		} catch (error) {
			console.error("Error handling submit:", error);
		} finally {
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

	if (!survey) return <Loader></Loader>;

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
