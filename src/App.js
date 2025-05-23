import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Surveys/Dashboard";
import TakeSurvey from "./components/Surveys/TakeSurvey";
import ThankYou from "./components/Surveys/ThankYou";
import ViewResponses from "./components/Surveys/ViewResponses";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./PrivateRoute";
import ChatPage from "./pages/ChatPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/dashboard/*"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route path="/take_survey/:id" element={<TakeSurvey />} />
				<Route path="/thank-you" element={<ThankYou />} />
				<Route path="/survey/:id/responses" element={<ViewResponses />} />
				<Route path="/chat_with_bot/:botId" element={<ChatPage />} />
			</Routes>
		</Router>
	);
}

export default App;
