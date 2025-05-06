import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Auth0Provider
			useRefreshTokens={true}
			cacheLocation="localstorage"
			domain={process.env.REACT_APP_AUTH_DOMAIN}
			clientId={process.env.REACT_APP_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
			onRedirectCallback={(appState) => {
				window.history.replaceState(
					{},
					document.title,
					appState?.returnTo || "/dashboard"
				);
			}}
		>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);
