import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/view_responses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

function ViewResponses() {
	const id = sessionStorage.getItem("surveyId");
	const [responses, setResponses] = useState([]);
	const [surveyDetails, setSurveyDetails] = useState({});

	useEffect(() => {
		const fetchSurveyDetails = async () => {
			try {
				const response = await axios.get(`${backendbaseurl}/survey/${id}`);

				setSurveyDetails(response.data);
			} catch (error) {
				console.error("Error fetching survey details:", error);
			}
		};

		const fetchResponses = async () => {
			try {
				const response = await axios.get(
					`${backendbaseurl}/response/${id}/responses`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				setResponses(response.data);
			} catch (error) {
				console.error("Error fetching responses:", error);
			}
		};

		fetchSurveyDetails();
		fetchResponses();
	}, [id]);

	return (
		<div className="responses-container">
			<div
				className="back-button"
				onClick={() => {
					window.history.back();
				}}
			>
				<FontAwesomeIcon icon={faArrowLeft} /> Back
			</div>
			<h1>Survey Details</h1>
			<div className="survey-details">
				<table className="table table-borderless">
					<thead>
						<tr>
							<th scope="col">Date</th>
							<th scope="col">Time</th>
							<th scope="col">Responses</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{new Date(surveyDetails.createdDate).toLocaleDateString() ||
									"N/A"}
							</td>
							<td>
								{new Date(surveyDetails.createdDate).toLocaleTimeString() ||
									"N/A"}
							</td>
							<td>{responses.length || "0"}</td>
							<td>
								{surveyDetails.isClosed ? (
									<span className="status inactive">Inactive</span>
								) : (
									<span className="status active">Active</span>
								)}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="survey-info">
					<h2>{surveyDetails.title || "Survey Title"}</h2>
					<p>
						{surveyDetails.description ||
							"Survey description goes here. This text provides an overview of the survey."}
					</p>
				</div>
			</div>
			{responses.length === 0 ? (
				<p>No responses yet.</p>
			) : (
				<Accordion>
					{responses.map((response, index) => (
						<Accordion.Item
							eventKey={index.toString()}
							key={index}
							className="accordion-item"
						>
							<Accordion.Header className="accordion-header">
								{`Response ${index + 1} - ${new Date(
									response.createdAt
								).toLocaleDateString()} (${
									response.isCompleted ? "Completed" : "Incomplete"
								})`}
							</Accordion.Header>
							<Accordion.Body className="accordion-body">
								{response.questions.map((q, idx) => (
									<div key={idx} className="question-response">
										<strong>{q.question}</strong>
										<p className="answer">{q.response || "No response"}</p>
									</div>
								))}
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			)}
		</div>
	);
}

export default ViewResponses;
