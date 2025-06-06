import "../../styles/surveys/view_responses.css";
import React, { useState, useEffect, useCallback } from "react";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { activateMySurveysComponent } from "../../redux/dashboardSlice";
import moment from "moment";
import { surveyService } from "../../services/surveyService";
import Loader from "../Loader";

function ViewResponses() {
	const dispatch = useDispatch();

	const [responses, setResponses] = useState([]);
	const [surveyDetails, setSurveyDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const id = sessionStorage.getItem("surveyId");
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 5,
		total: 0,
		totalPages: 1,
		sortField: "createdAt",
	});

	const fetchResponses = useCallback(async () => {
		try {
			const params = {
				page: pagination.currentPage,
				limit: pagination.itemsPerPage,
				sort: pagination.sortField,
			};

			const response = await surveyService.getResponsesOfSurvey(params, id);

			setResponses(response.data.responses);
			setPagination((prev) => ({
				...prev,
				total: response.data.total,
				totalPages: response.data.totalPages,
			}));
		} catch (error) {
			console.error("Error fetching responses:", error);
		}
	}, [
		id,
		pagination.currentPage,
		pagination.itemsPerPage,
		pagination.sortField,
	]);

	const getSurveyDetails = useCallback(async () => {
		const response = await surveyService.getSurveyDetails(id);
		setSurveyDetails(response.data);
	}, [id]);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= pagination.totalPages) {
			setPagination((prev) => ({ ...prev, currentPage: newPage }));
		}
	};

	const handleLimitChange = (e) => {
		const newLimit = parseInt(e.target.value);
		setPagination((prev) => ({
			...prev,
			itemsPerPage: newLimit,
			currentPage: 1,
		}));
	};

	const handleSortChange = (e) => {
		setPagination((prev) => ({
			...prev,
			sortField: e.target.value,
			currentPage: 1,
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await Promise.all([getSurveyDetails(), fetchResponses()]);
			setIsLoading(false);
		};
		fetchData();
	}, [
		getSurveyDetails,
		fetchResponses,
		id,
		pagination.currentPage,
		pagination.itemsPerPage,
		pagination.sortField,
	]);

	if (isLoading) {
		return <Loader loadingText={"Loading Responses..."}></Loader>;
	}

	return (
		<>
			<div className="surveys-header">
				<div className="controls-left">
					<span>Show:</span>
					<select
						value={pagination.itemsPerPage}
						onChange={handleLimitChange}
						className="entries-select"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
					</select>
					<span>entries</span>
				</div>

				<div className="controls-right">
					<div className="sort-control">
						<span>Sort by:</span>
						<select
							value={pagination.sortField}
							onChange={handleSortChange}
							className="sort-select"
						>
							<option value="updatedAt">Latest First</option>
							<option value="oldest">Oldest First</option>
							<option value="isCompleted">Completed First</option>
						</select>
					</div>

					<div className="pagination-controls">
						<button
							onClick={() => handlePageChange(pagination.currentPage - 1)}
							disabled={pagination.currentPage === 1}
						>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className="pagination-icon"
							/>
						</button>
						<span className="page-indicator">
							{pagination.currentPage}/{pagination.totalPages}
						</span>
						<button
							onClick={() => handlePageChange(pagination.currentPage + 1)}
							disabled={pagination.currentPage >= pagination.totalPages}
						>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="pagination-icon"
							/>
						</button>
					</div>
				</div>
			</div>

			<div className="responses-container">
				<div
					className="back-button text-black"
					onClick={() => {
						dispatch(activateMySurveysComponent());
					}}
				>
					<FontAwesomeIcon icon={faArrowLeft} /> Back
				</div>
				<h1>Survey Details</h1>
				<div className="survey-details">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">Created Date</th>
								<th scope="col">Created Time</th>
								<th scope="col">Total Response</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									{moment(surveyDetails.createdAt).format("MMMM D, YYYY") ||
										"N/A"}
								</td>
								<td>
									{moment(surveyDetails.createdAt).format("h:mm:ss A") || "N/A"}
								</td>
								<td>{pagination?.total || "0"}</td>
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
		</>
	);
}

export default ViewResponses;
