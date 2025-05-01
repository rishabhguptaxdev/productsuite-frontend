import axios from "axios";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

export const surveyService = {
	// Get all surveys
	getAllSurvyes: async (params) => {
		try {
			const response = await axios.get(`${backendbaseurl}/survey/`, {
				params,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			return response;
		} catch (error) {
			throw error;
		}
	},

	// Change status of survey
	changeSurveyStatus: async (surveyId, currentStatus) => {
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
		} catch (err) {
			throw err;
		}
	},

	// Create new survey
	createSurvey: async (title, description, firstQuestion, maxQuestions) => {
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

			return response;
		} catch (err) {
			throw err;
		}
	},

	getResponsesOfSurvey: async (params, surveyId) => {
		const response = await axios.get(
			`${backendbaseurl}/response/${surveyId}/responses`,
			{
				params,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);

		return response;
	},

	getSurveyDetails: async (surveyId) => {
		const response = await axios.get(`${backendbaseurl}/survey/${surveyId}`);
		return response;
	},

	getSurveyByLoggerId: async (loggerId, surveyId) => {
		const response = await axios.get(`${backendbaseurl}/response/${loggerId}`, {
			params: {
				surveyId,
			},
		});

		return response;
	},

	getSurveyResponse: async (surveyId) => {
		const response = await axios.get(`${backendbaseurl}/survey/${surveyId}`, {
			params: {
				surveyId,
			},
		});

		return response;
	},

	getLoggerId: async (surveyId) => {
		const response = await axios.post(
			`${backendbaseurl}/response/getLoggerId/${surveyId}`
		);

		return response;
	},

	saveResponse: async (loggerId, responses) => {
		const response = await axios.post(
			`${backendbaseurl}/response/${loggerId}`,
			{
				responses: responses,
			}
		);

		return response;
	},
};
