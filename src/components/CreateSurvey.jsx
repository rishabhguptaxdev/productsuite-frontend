import React, { useState } from "react";
import axios from "axios";
import "../css/create_survey.css";
import SurveyCreated from "./SurveyCreated";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;
const frontendbaseurl = process.env.REACT_APP_FRONTEND_URL;

function CreateSurvey() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [firstQuestion, setFirstQuestion] = useState("");
	const [maxQuestions, setMaxQuestions] = useState(5);
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [surveyCreated, setSurveyCreated] = useState(false);

	const checkFormCompletion = () => {
		setIsFormComplete(
			title.trim() !== "" &&
				firstQuestion.trim() !== "" &&
				description.trim() !== "" &&
				maxQuestions > 0
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${backendbaseurl}/survey`,
				{
					title,
					description,
					first_question: firstQuestion,
					max_questions: maxQuestions,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			console.log();

			sessionStorage.setItem(
				"surveyLink",
				`${frontendbaseurl}/take_survey/${response.data.savedSurvey._id}`
			);
			setSurveyCreated(true);
		} catch (error) {
			alert("Error creating survey");
		}
	};

	return surveyCreated ? (
		<SurveyCreated />
	) : (
		<div className="create-survey">
			<form onSubmit={handleSubmit}>
				<h2>Create Survey</h2>
				<div className="form-group">
					<label htmlFor="surveyTitle">
						Survey Title <span>*</span>
					</label>
					<input
						type="text"
						id="surveyTitle"
						value={title}
						placeholder="Enter Title"
						onChange={(e) => setTitle(e.target.value)}
						onInput={checkFormCompletion}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="surveyDescription">
						About the Survey <span>*</span>
					</label>
					<input
						type="text"
						id="surveyDescription"
						value={description}
						placeholder="Write in detail what exactly you are creating this survey about"
						onChange={(e) => setDescription(e.target.value)}
						onInput={checkFormCompletion}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="surveyQuestion">
						First Question <span>*</span>
					</label>
					<input
						type="text"
						id="surveyQuestion"
						value={firstQuestion}
						placeholder="Type of first question to start with"
						onChange={(e) => setFirstQuestion(e.target.value)}
						onInput={checkFormCompletion}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="maxQuestions">
						Number of Questions <span>*</span>
					</label>
					<select
						id="maxQuestions"
						value={maxQuestions}
						onChange={(e) => setMaxQuestions(Number(e.target.value))}
						onInput={checkFormCompletion}
						required
					>
						<option value="" disabled>
							Select number of questions
						</option>
						<option value="5">5</option>
						<option value="10">10</option>
					</select>
					<div className="row">
						<div className="col p-3"></div>

						<div className="col p-3">
							<button type="reset" className="btn btn-outline-primary">
								Clear All
							</button>
						</div>

						<div className="col p-3">
							<button
								className="btn btn-primary"
								type="submit"
								disabled={!isFormComplete}
							>
								Create Survey
							</button>
						</div>
					</div>
				</div>
				<div className="buttons container overflow-hidden text-center"></div>
			</form>
		</div>
	);
}

export default CreateSurvey;
