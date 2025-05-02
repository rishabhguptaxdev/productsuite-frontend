import React, { useEffect, useState } from "react";
import {
	Box,
	CircularProgress,
	Typography,
	Paper,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	DialogTitle,
} from "@mui/material";
import { botService } from "../../services/botService";
import ReactMarkdown from "react-markdown";

const BotList = () => {
	const [loading, setIsLoading] = useState(false);
	const [error, setIsError] = useState(false);
	const [bots, setBots] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedBot, setSelectedBot] = useState(null);
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState([]);
	const [istyping, setIsTyping] = useState(false);

	useEffect(() => {
		const getBots = async () => {
			try {
				setIsLoading(true);
				const response = await botService.fetchBots();
				setBots(response);
			} catch (err) {
				console.log(err);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		getBots();
	}, []);

	const handleChatWithBot = (bot) => {
		setSelectedBot(bot);
		setChatMessages([]);
		setOpenDialog(true);
	};

	const handleSendMessage = async () => {
		if (message.trim()) {
			setChatMessages((prev) => [...prev, { sender: "user", text: message }]);
			setMessage("");

			try {
				setIsTyping(true);

				const response = await botService.sendMessage(selectedBot, message);

				const data = await response.json();

				if (data.answer) {
					setChatMessages((prev) => [
						...prev,
						{ sender: "bot", text: data.answer },
					]);
				} else {
					setChatMessages((prev) => [
						...prev,
						{ sender: "bot", text: "Sorry, I couldn't understand that." },
					]);
				}
			} catch (err) {
				setChatMessages((prev) => [
					...prev,
					{
						sender: "bot",
						text: "There was an error communicating with the bot.",
					},
				]);
			} finally {
				setIsTyping(false);
			}
		}
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setMessage("");
	};

	if (loading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="200px"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="200px"
			>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
			<Typography variant="h5" gutterBottom>
				List of Bots
			</Typography>
			{bots.length === 0 ? (
				<Typography variant="body1">No bots available</Typography>
			) : (
				<ul>
					{bots.map((bot) => (
						<li key={bot._id}>
							<Typography variant="body1">
								{bot.name} - {bot.description}
							</Typography>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => handleChatWithBot(bot)}
							>
								Chat with Bot
							</Button>
						</li>
					))}
				</ul>
			)}

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullWidth
				maxWidth="lg"
				sx={{ height: "100vh" }}
			>
				<DialogTitle>Chat with {selectedBot?.name}</DialogTitle>
				<DialogContent
					sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
				>
					<Box sx={{ flex: 1, overflowY: "auto" }}>
						{chatMessages.map((msg, index) => (
							<Box
								key={index}
								sx={{
									mb: 2,
									textAlign: msg.sender === "user" ? "right" : "left",
								}}
							>
								<Typography variant="body1">
									{msg.sender === "user" ? "You" : "Bot"}:
								</Typography>
								<ReactMarkdown>{msg.text}</ReactMarkdown>
							</Box>
						))}

						{istyping && (
							<Box sx={{ textAlign: "center", mt: 2 }}>
								<Typography variant="body1" color="textSecondary">
									Bot is typing...
								</Typography>
							</Box>
						)}
					</Box>

					<TextField
						label="Type a message"
						variant="outlined"
						fullWidth
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSendMessage();
							}
						}}
						sx={{ mt: 2 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="secondary">
						Close
					</Button>
					<Button onClick={handleSendMessage} color="primary">
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</Paper>
	);
};

export default BotList;
