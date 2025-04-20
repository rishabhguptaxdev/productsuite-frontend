import { createSlice } from "@reduxjs/toolkit";

const botSlice = createSlice({
	name: "bot",
	initialState: {
		showCreateBot: true,
		showViewBots: false,
	},
	reducers: {
		showCreateBot: (state, action) => {
			state.showCreateBot = true;
			state.showViewBots = false;
		},
		showViewBots: (state, action) => {
			state.showCreateBot = false;
			state.showViewBots = true;
		},
	},
});

export const { showCreateBot, showViewBots } = botSlice.actions;
export default botSlice.reducer;
