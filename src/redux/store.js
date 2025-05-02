import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import botReducer from "./botSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		dashboard: dashboardReducer,
		bot: botReducer,
	},
});

export default store;
