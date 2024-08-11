import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TakeSurvey from "./components/TakeSurvey";
import ThankYou from "./components/ThankYou";
import ViewResponses from "./components/ViewResponses";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function DashboardWrapper() {
	const location = useLocation();
	const { state } = location;
	const view = state ? state.view : "create";

	return <Dashboard initialView={view} />;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				{/* <Route path="/" element={<Home />} /> */}
				<Route
					path="/dashboard"
					element={<ProtectedRoute element={DashboardWrapper} />}
				/>
				<Route path="/take_survey/:id" element={<TakeSurvey />} />
				<Route path="/thank-you" element={<ThankYou />} />
				<Route
					path="/survey/:id/responses"
					element={<ProtectedRoute element={ViewResponses} />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}

export default App;
