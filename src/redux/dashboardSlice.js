import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		showCreateSurvey: true,
		showSurveyCreated: false,
		showMySurveys: false,
		showViewResponse: false,
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
	},
});

export const {
	activateCreateSurveyComponent,
	activateSurveyCreatedComponent,
	activateMySurveysComponent,
	activateViewResponseComponent,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
