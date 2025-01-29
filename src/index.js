import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store.js"; // Import the Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Auth0Provider
			useRefreshTokens={true}
			cacheLocation="localstorage"
			domain={process.env.REACT_APP_AUTH_DOMAIN}
			clientId={process.env.REACT_APP_CLIENT_ID}
			authorizationParams={{
				redirect_uri: `${window.location.origin}/dashboard`,
			}}
		>
			<Provider store={store}>
				<App />
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);
