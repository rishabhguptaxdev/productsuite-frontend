import React, { useState } from "react";
import "../css/survey_created.css"; // Ensure this path is correct
import GreenTick from "../images/svgs/greenTick.svg";
import { useDispatch } from "react-redux";
import { activateCreateSurveyComponent } from "../redux/dashboardSlice";

function SurveyCreated() {
	const [linkCopied, setLinkCopied] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			<div className="survey-created-container">
				<img src={GreenTick} alt="Green tick" className="green-tick-icon" />
				<h5 style={{ fontWeight: "bold" }}>
					Your survey link has been successfully generated.
				</h5>
				<p>Copy the link and share it with others</p>

				<div class="row input-group mb-3">
					<div className="col-8">
						<input
							readOnly
							type="text"
							class="form-control"
							value={sessionStorage.getItem("surveyLink")}
						/>
					</div>

					{/* <div className="col-"></div> */}

					<div className="col-4">
						<button
							style={{
								backgroundColor: linkCopied ? "green" : "blue",
								color: "white",
							}}
							class="btn btn-outline-secondary"
							type="button"
							onClick={() => {
								setLinkCopied(true);
								navigator.clipboard.writeText(
									sessionStorage.getItem("surveyLink")
								);
							}}
						>
							{linkCopied ? "Copied" : "Copy Link"}
						</button>
					</div>
				</div>

				<h6
					onClick={() => {
						dispatch(activateCreateSurveyComponent());
					}}
					className="create-another-survey-link"
				>
					Create Another Survey
				</h6>
			</div>
		</>
	);
}

export default SurveyCreated;
