import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
	Box,
	Typography,
	IconButton,
	TextField,
	Avatar,
	Paper,
	List,
	ListItem,
	ListItemAvatar,
	Divider,
	Chip,
	Tooltip,
	InputAdornment,
	Fab,
	CircularProgress,
} from "@mui/material";
import {
	Send as SendIcon,
	Close as CloseIcon,
	Fullscreen as FullscreenIcon,
	FullscreenExit as FullscreenExitIcon,
	SmartToy as SmartToyIcon,
	Person as PersonIcon,
} from "@mui/icons-material";
import { botService } from "../../services/botService";

const ChatInterface = ({ bot, onClose, forceFullScreen = false }) => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isFullScreen, setIsFullScreen] = useState(forceFullScreen);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	// Initial greeting from the bot
	useEffect(() => {
		setMessages([
			{
				text: `Hello! I'm ${bot.name}. ${
					bot.description || "How can I help you today?"
				}`,
				sender: "bot",
				timestamp: new Date(),
			},
		]);
	}, [bot]);

	// Scroll to bottom of messages
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = async () => {
		if (input.trim() === "") return;

		// Add user message
		const userMessage = {
			text: input,
			sender: "user",
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		inputRef.current.focus();

		try {
			setIsTyping(true);

			const response = await botService.sendMessage(bot, input);
			const data = await response.json();

			const botMessage = {
				text: data.answer || "Sorry, I couldn't understand that.",
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (err) {
			const errorMessage = {
				text: "There was an error communicating with the bot.",
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsTyping(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const toggleFullScreen = () => {
		if (!forceFullScreen) {
			setIsFullScreen(!isFullScreen);
		}
	};

	return (
		<Box
			sx={{
				position: "fixed",
				bottom: isFullScreen ? 0 : "20px",
				right: isFullScreen ? 0 : "20px",
				width: isFullScreen ? "100%" : { xs: "calc(100% - 40px)", sm: "400px" },
				height: isFullScreen
					? "100vh"
					: { xs: "calc(100% - 40px)", sm: "500px" },
				backgroundColor: "background.paper",
				boxShadow: 3,
				display: "flex",
				flexDirection: "column",
				zIndex: 1200,
				borderRadius: isFullScreen ? 0 : "8px",
				transition: "all 0.3s ease",
			}}
		>
			{/* Chat header */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					p: 2,
					bgcolor: "primary.main",
					color: "primary.contrastText",
					borderRadius: isFullScreen ? 0 : "8px 8px 0 0",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
						<SmartToyIcon />
					</Avatar>
					<Typography variant="h6">{bot.name}</Typography>
					{isTyping && (
						<Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
							<CircularProgress size={20} color="inherit" />
							<Typography variant="caption" sx={{ ml: 1 }}>
								Typing...
							</Typography>
						</Box>
					)}
				</Box>

				<Box>
					{!forceFullScreen && (
						<>
							<Tooltip title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}>
								<IconButton
									onClick={toggleFullScreen}
									sx={{ color: "inherit", mr: 1 }}
								>
									{isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
								</IconButton>
							</Tooltip>
							<Tooltip title="Close chat">
								<IconButton onClick={onClose} sx={{ color: "inherit" }}>
									<CloseIcon />
								</IconButton>
							</Tooltip>
						</>
					)}
				</Box>
			</Box>

			{/* Messages area */}
			<Box
				sx={{
					flex: 1,
					overflowY: "auto",
					p: 2,
					backgroundColor: "background.default",
				}}
			>
				<List sx={{ width: "100%" }}>
					{messages.map((message, index) => (
						<React.Fragment key={index}>
							<ListItem
								sx={{
									display: "flex",
									justifyContent:
										message.sender === "user" ? "flex-end" : "flex-start",
									px: 1,
								}}
							>
								{message.sender === "bot" && (
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: "primary.main" }}>
											<SmartToyIcon />
										</Avatar>
									</ListItemAvatar>
								)}
								<Box
									sx={{
										maxWidth: "70%",
										display: "flex",
										flexDirection: "column",
										alignItems:
											message.sender === "user" ? "flex-end" : "flex-start",
									}}
								>
									<Paper
										elevation={0}
										sx={{
											p: 2,
											bgcolor:
												message.sender === "user"
													? "primary.main"
													: "background.paper",
											color:
												message.sender === "user"
													? "primary.contrastText"
													: "text.primary",
											borderRadius:
												message.sender === "user"
													? "18px 18px 0 18px"
													: "18px 18px 18px 0",
											overflowX: "auto", // Allows horizontal scrolling for wide tables
										}}
									>
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												p: ({ node, ...props }) => (
													<Typography
														variant="body1"
														component="div"
														{...props}
													/>
												),
												table: ({ node, ...props }) => (
													<Box
														component="table"
														sx={{
															borderCollapse: "collapse",
															width: "100%",
															my: 2,
															"& th, & td": {
																border: "1px solid",
																borderColor: "divider",
																padding: "8px 12px",
																textAlign: "left",
															},
															"& th": {
																backgroundColor: "action.hover",
																fontWeight: "600",
															},
															"& tr:nth-of-type(even)": {
																backgroundColor: "background.default",
															},
														}}
														{...props}
													/>
												),
												th: ({ node, ...props }) => (
													<Typography
														component="th"
														variant="body1"
														{...props}
													/>
												),
												td: ({ node, ...props }) => (
													<Typography
														component="td"
														variant="body1"
														{...props}
													/>
												),
												strong: ({ node, ...props }) => (
													<strong style={{ fontWeight: 600 }} {...props} />
												),
											}}
										>
											{message.text}
										</ReactMarkdown>
									</Paper>
									<Chip
										label={new Date(message.timestamp).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
										size="small"
										sx={{ mt: 0.5, fontSize: "0.6rem", height: "20px" }}
									/>
								</Box>
								{message.sender === "user" && (
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: "secondary.main", ml: 2 }}>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
								)}
							</ListItem>
							{index < messages.length - 1 && <Divider variant="inset" />}
						</React.Fragment>
					))}
					<div ref={messagesEndRef} />
				</List>
			</Box>

			{/* Input area */}
			<Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
				<TextField
					inputRef={inputRef}
					fullWidth
					variant="outlined"
					placeholder="Type a message..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={handleKeyPress}
					multiline
					maxRows={4}
					disabled={isTyping}
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "24px",
							paddingRight: "60px",
						},
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment
								position="end"
								sx={{ position: "absolute", right: "8px", bottom: "8px" }}
							>
								<Fab
									color="primary"
									size="small"
									onClick={handleSendMessage}
									disabled={input.trim() === "" || isTyping}
									sx={{
										width: "40px",
										height: "40px",
										boxShadow: "none",
										"&:hover": {
											boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
										},
										"&.Mui-disabled": {
											backgroundColor: "action.disabledBackground",
											color: "action.disabled",
										},
									}}
								>
									<SendIcon fontSize="small" />
								</Fab>
							</InputAdornment>
						),
					}}
				/>
			</Box>
		</Box>
	);
};

export default ChatInterface;
