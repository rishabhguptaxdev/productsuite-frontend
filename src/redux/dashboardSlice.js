import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		showCreateSurvey: true,
		showSurveyCreated: false,
		showMySurveys: false,
		showViewResponse: false,
		mySurveysState: {
			currentPage: 1,
			itemsPerPage: 5,
			sortField: "_id",
			total: 0, // Add these
			totalPages: 1, // Add these
		},
	},
	reducers: {
		activateCreateSurveyComponent: (state, action) => {
			state.showCreateSurvey = true;
			state.showSurveyCreated = false;
			state.showMySurveys = false;
			state.showViewResponse = false;
		},
		activateSurveyCreatedComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = true;
			state.showMySurveys = false;
			state.showViewResponse = false;
		},
		activateMySurveysComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = false;
			state.showMySurveys = true;
			state.showViewResponse = false;
		},
		activateViewResponseComponent: (state, action) => {
			console.log("activated view response");
			state.showCreateSurvey = false;
			state.showSurveyCreated = false;
			state.showMySurveys = false;
			state.showViewResponse = true;
		},
		setMySurveysState: (state, action) => {
			state.mySurveysState = {
				...state.mySurveysState,
				...action.payload,
			};
		},
	},
});

export const {
	setMySurveysState,
	activateCreateSurveyComponent,
	activateSurveyCreatedComponent,
	activateMySurveysComponent,
	activateViewResponseComponent,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
