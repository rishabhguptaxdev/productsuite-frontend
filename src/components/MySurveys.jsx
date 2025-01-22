import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/styles.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ViewResponses from "./ViewResponses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;
const frontendbaseurl = process.env.REACT_APP_FRONTEND_URL;

function MySurveys() {
	const [surveys, setSurveys] = useState([]);
	const [openSurvey, setOpenSurvey] = useState(false);

	const loadSurveys = async () => {
		try {
			const response = await axios.get(`${backendbaseurl}/survey/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setSurveys(response.data.surveys);
		} catch (error) {
			console.error("Error loading surveys", error);
		}
	};

	const handleToggleChange = async (surveyId, currentStatus) => {
		try {
			await axios.patch(
				`${backendbaseurl}/survey/${surveyId}/status`,
				{ isClosed: !currentStatus },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setSurveys((prevSurveys) =>
				prevSurveys.map((survey) =>
					survey._id === surveyId
						? { ...survey, isClosed: !currentStatus }
						: survey
				)
			);
		} catch (error) {
			console.error("Error updating survey status", error);
		}
	};

	useEffect(() => {
		loadSurveys();
	}, []);

	return openSurvey ? (
		<div>
			<ViewResponses />
		</div>
	) : (
		<div className="my-surveys">
			<h1>Surveys</h1>
			<ToastContainer />
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Time</th>
						<th scope="col">Survey Title</th>
						<th scope="col">Responses</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{surveys.map((survey) => (
						<tr
							key={survey._id}
							className="clickable-row"
							onClick={() => {
								setOpenSurvey(true);
								sessionStorage.setItem("surveyId", survey._id);
							}}
						>
							<td>{moment(survey.createdDate).format("MMMM D, YYYY")}</td>
							<td>{moment(survey.createdDate).format("h:mm:ss A")}</td>
							<td>{survey.title}</td>
							<td>{survey.responseCount}</td>
							<td>
								{/* Toggle Button */}
								<label className="switch">
									<input
										type="checkbox"
										checked={!survey.isClosed}
										onClick={(e) => e.stopPropagation()} // Prevent row click
										onChange={() =>
											handleToggleChange(survey._id, survey.isClosed)
										}
									/>
									<span
										className="slider round"
										onClick={(e) => e.stopPropagation()}
									></span>
								</label>
								{/* Copy Link Button */}
								<span
									className="icon-wrapper"
									onClick={(e) => {
										e.stopPropagation(); // Stop the row click
										navigator.clipboard.writeText(
											`${frontendbaseurl}/take_survey/${survey._id}`
										);
										toast.info("Link copied to clipboard!", {
											position: "top-right",
										});
									}}
								>
									<FontAwesomeIcon
										className="copyLink"
										icon={faLink}
										size="xl"
									/>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MySurveys;
