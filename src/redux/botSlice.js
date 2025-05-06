import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentView: "view",
	bots: [],
	loading: false,
	error: null,
	success: null,
};

const botSlice = createSlice({
	name: "bot",
	initialState,
	reducers: {
		showCreateBot: (state) => {
			state.currentView = "create";
			state.success = null;
		},
		showViewBots: (state) => {
			state.currentView = "view";
			state.success = null;
		},
		setBots: (state, action) => {
			state.bots = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setSuccess: (state, action) => {
			state.success = action.payload;
		},
		clearMessages: (state) => {
			state.error = null;
			state.success = null;
		},
	},
});

export const {
	showCreateBot,
	showViewBots,
	setBots,
	setLoading,
	setError,
	setSuccess,
	clearMessages,
} = botSlice.actions;

export default botSlice.reducer;
