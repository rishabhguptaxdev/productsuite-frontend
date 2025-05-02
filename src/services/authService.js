const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

export const authService = {
	loginSignup: async (accessToken, user) => {
		try {
			const response = await fetch(`${backendbaseurl}/auth/signup-login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					email: user.email,
					auth0Id: user.sub,
				}),
			});

			return response;
		} catch (err) {
			throw err;
		}
	},
};
