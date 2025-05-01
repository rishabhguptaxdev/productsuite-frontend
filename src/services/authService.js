import axios from "axios";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

export const authService = {
	// Fetch user's bots
	loginSignup: async (accessToken, user) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup-login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						email: user.email,
						auth0Id: user.sub,
					}),
				}
			);

			return response;
		} catch (err) {
			throw err;
		}
	},

	// Create new bot
	createBot: async (name, description, files) => {
		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("description", description);

			Array.from(files).forEach((file) => {
				formData.append("documents", file);
			});

			const response = await axios.post(`${backendbaseurl}/bots`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			return response.data.bot;
		} catch (err) {
			throw err;
		}
	},
};
