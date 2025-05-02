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
			total: 0,
			totalPages: 1,
		},
	},
	reducers: {
		activateCreateSurveyComponent: (state, action) => {
			state.showCreateSurvey = true;
			state.showSurveyCreated = false;
			state.showMySurveys = false;
			state.showViewResponse = false;
			state.showBotDashboard = false;
		},
		activateSurveyCreatedComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = true;
			state.showMySurveys = false;
			state.showViewResponse = false;
			state.showBotDashboard = false;
		},
		activateMySurveysComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = false;
			state.showMySurveys = true;
			state.showViewResponse = false;
			state.showBotDashboard = false;
		},
		activateViewResponseComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = false;
			state.showMySurveys = false;
			state.showViewResponse = true;
			state.showBotDashboard = false;
		},
		activateBotComponent: (state, action) => {
			state.showCreateSurvey = false;
			state.showSurveyCreated = false;
			state.showMySurveys = false;
			state.showViewResponse = false;
			state.showBotDashboard = true;
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
	activateBotComponent,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
