import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInterface from "../components/Bots/ChatInterface";
import { botService } from "../services/botService";
import { Box, Typography, CircularProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ChatPage = () => {
	const { botId } = useParams();
	const [bot, setBot] = useState(null);
	const [error, setError] = useState(null);
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBot = async () => {
			try {
				const res = await botService.getPublicBotById(botId);
				setBot(res.bot);
			} catch (err) {
				const statusCode = err.response?.status;
				const message =
					err.response?.data?.message || err.message || "Something went wrong";
				setError(message);
				setStatus(statusCode);
			} finally {
				setLoading(false);
			}
		};

		fetchBot();
	}, [botId]);

	if (loading) {
		return (
			<Box sx={{ mt: 8, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ mt: 10, textAlign: "center", color: "text.secondary" }}>
				{status === 403 ? (
					<LockOutlinedIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
				) : (
					<ErrorOutlineIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
				)}
				<Typography variant="h6" sx={{ mb: 1, color: "error.main" }}>
					{error}
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					{status === 403
						? "Please ask the admin for access to this bot."
						: "This bot may have been removed or never existed."}
				</Typography>
			</Box>
		);
	}

	return <ChatInterface bot={bot} forceFullScreen />;
};

export default ChatPage;
