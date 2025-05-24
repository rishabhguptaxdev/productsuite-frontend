import axios from "axios";

const backendbaseurl = process.env.REACT_APP_BACKEND_URL;

export const botService = {
	fetchBots: async () => {
		try {
			const response = await axios.get(`${backendbaseurl}/bots/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			return response.data?.bots ?? [];
		} catch (err) {
			throw err;
		}
	},

	createBot: async (name, description, files) => {
		try {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("description", description);

			Array.from(files).forEach((file) => {
				formData.append("documents", file);
			});

			const response = await axios.post(`${backendbaseurl}/bots/`, formData, {
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

	sendMessage: async (selectedBot, message) => {
		const response = await fetch(`${backendbaseurl}/chat/${selectedBot._id}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ question: message }),
		});

		return response;
	},

	getBotById: async (botId) => {
		const response = await axios.get(`${backendbaseurl}/bots/${botId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		});

		return response;
	},

	getPublicBotById: async (botId) => {
		const response = await axios.get(`${backendbaseurl}/bots/public/${botId}`);

		return response.data;
	},

	toggleShareable: async (botId, isShareable) => {
		return await axios.put(
			`${backendbaseurl}/bots/${botId}`,
			{ isShareable },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
	},

	deleteBot: async (botId) => {
		return await axios.delete(`${backendbaseurl}/bots/${botId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
	},
};
