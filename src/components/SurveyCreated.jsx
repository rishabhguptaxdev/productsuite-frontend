import React from "react";
import "../css/survey_created.css"; // Ensure this path is correct
import GreenTick from "../images/svgs/greenTick.svg";

function SurveyCreated() {
	return (
		<div className="survey-created-container">
			<img src={GreenTick} alt="Green tick" className="green-tick-icon" />
			<h1>Your survey link has been successfully generated.</h1>
			<p>Copy the link and share it among users</p>

			<div class="input-group mb-3">
				<input
					readOnly
					type="text"
					class="form-control"
					value={sessionStorage.getItem("surveyLink")}
				/>
				<button
					class="btn btn-outline-secondary"
					type="button"
					onClick={() =>
						navigator.clipboard.writeText(sessionStorage.getItem("surveyLink"))
					}
				>
					Copy Link
				</button>
			</div>

			<p>
				Lorem Ipsume orto lore{" "}
				<a href="#" className="create-another-survey-link">
					Create Another Survey
				</a>
			</p>
		</div>
	);
}

export default SurveyCreated;
