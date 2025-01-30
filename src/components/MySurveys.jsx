import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/styles.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLink,
	faSpinner,
	faPlusCircle,
	faClipboard,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	activateViewResponseComponent,
	activateCreateSurveyComponent,
	setMySurveysState,
} from "../redux/dashboardSlice";
import ViewResponses from "./ViewResponses";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;
const frontendbaseurl = process.env.REACT_APP_FRONTEND_URL;

function MySurveys() {
	const mySurveysState = useSelector((state) => state.dashboard.mySurveysState);
	const [surveys, setSurveys] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const dispatch = useDispatch();

	const loadSurveys = async () => {
		try {
			setIsLoading(true);
			const params = {
				page: mySurveysState.currentPage,
				limit: mySurveysState.itemsPerPage,
				sort: mySurveysState.sortField,
			};

			const response = await axios.get(`${backendbaseurl}/survey/`, {
				params,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setSurveys(response.data.surveys);
			dispatch(
				setMySurveysState({
					total: response.data.total,
					totalPages: response.data.totalPages,
				})
			);
		} catch (error) {
			console.error("Error loading surveys", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopyLink = (surveyId) => {
		navigator.clipboard.writeText(`${frontendbaseurl}/take_survey/${surveyId}`);
		setShowCopiedMessage(true);
		setTimeout(() => {
			setShowCopiedMessage(false);
		}, 2000); // Show for 2 seconds
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

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= mySurveysState.totalPages) {
			dispatch(setMySurveysState({ currentPage: newPage }));
		}
	};

	const handleLimitChange = (e) => {
		const newLimit = parseInt(e.target.value);
		dispatch(
			setMySurveysState({
				itemsPerPage: newLimit,
				currentPage: 1,
			})
		);
	};

	const handleSortChange = (e) => {
		dispatch(
			setMySurveysState({
				sortField: e.target.value,
				currentPage: 1,
			})
		);
	};

	useEffect(() => {
		loadSurveys();
	}, [
		mySurveysState.currentPage,
		mySurveysState.itemsPerPage,
		mySurveysState.sortField,
	]);

	/* Keep the existing return JSX structure exactly the same */
	return useSelector((state) => state.dashboard.showViewResponse) ? (
		<div>
			<ViewResponses />
		</div>
	) : (
		<div className="my-surveys-page">
			{/* Existing elements remain untouched */}
			{showCopiedMessage && (
				<div className="copied-message-global">Link copied</div>
			)}

			{!isLoading && surveys.length > 0 && (
				<div className="surveys-header">
					<div className="controls-left">
						<span>Show:</span>
						<select
							value={mySurveysState.itemsPerPage}
							onChange={handleLimitChange}
							className="entries-select text-black"
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
								value={mySurveysState.sortField}
								onChange={handleSortChange}
								className="sort-select"
							>
								<option value="_id">Newest</option>
								<option value="title">Title (A-Z)</option>
								<option value="responseCount">Most Responses</option>
							</select>
						</div>

						<div className="pagination-controls">
							<button
								onClick={() => handlePageChange(mySurveysState.currentPage - 1)}
								disabled={mySurveysState.currentPage === 1}
							>
								<FontAwesomeIcon
									icon={faChevronLeft}
									className="pagination-icon"
								/>
							</button>
							<span className="page-indicator">
								{mySurveysState.currentPage}/{mySurveysState.totalPages}
							</span>
							<button
								onClick={() => handlePageChange(mySurveysState.currentPage + 1)}
								disabled={
									mySurveysState.currentPage >= mySurveysState.totalPages
								} // Changed this line
							>
								<FontAwesomeIcon
									icon={faChevronRight}
									className="pagination-icon"
								/>
							</button>
						</div>
					</div>
				</div>
			)}

			{isLoading ? (
				<div className="loader-wrapper">
					<FontAwesomeIcon
						icon={faSpinner}
						spin
						size="3x"
						className="loader-icon"
					/>
					<p>Loading Surveys...</p>
				</div>
			) : (
				<div className="my-surveys">
					<h1>Surveys</h1>
					{surveys.length === 0 ? (
						<div className="no-surveys-message">
							<FontAwesomeIcon
								icon={faClipboard}
								className="empty-icon"
								size="3x"
							/>
							<p>No surveys created yet</p>
							<button
								className="btn btn-primary create-survey-btn"
								onClick={() => dispatch(activateCreateSurveyComponent())}
							>
								<FontAwesomeIcon icon={faPlusCircle} /> Create New Survey
							</button>
						</div>
					) : (
						<>
							<table className="table">
								{/* Keep existing table structure */}
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
												sessionStorage.setItem("surveyId", survey._id);
												console.log("clicked view response");
												dispatch(activateViewResponseComponent());
											}}
										>
											<td>
												{moment(survey.createdDate).format("MMMM D, YYYY")}
											</td>
											<td>{moment(survey.createdDate).format("h:mm:ss A")}</td>
											<td>{survey.title}</td>
											<td>{survey.responseCount}</td>
											<td>
												{/* Toggle Button */}
												<label className="switch">
													<input
														type="checkbox"
														checked={!survey.isClosed}
														onClick={(e) => e.stopPropagation()}
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
														e.stopPropagation();
														handleCopyLink(survey._id);
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
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default MySurveys;
