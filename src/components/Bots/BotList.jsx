import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { botService } from "../../services/botService";
import { setBots, setLoading, setError } from "../../redux/botSlice";
import ChatInterface from "./ChatInterface";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Button,
	Avatar,
	Chip,
	Divider,
	Skeleton,
	IconButton,
	Switch,
	Snackbar,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";

const BotList = () => {
	const dispatch = useDispatch();
	const { bots, loading, error } = useSelector((state) => state.bot);
	const [selectedBot, setSelectedBot] = React.useState(null);

	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMsg, setSnackbarMsg] = React.useState("");

	const handleCopyLink = (botId) => {
		const url = `${window.location.origin}/chat_with_bot/${botId}`;
		navigator.clipboard.writeText(url);
		setSnackbarMsg("Link copied!");
		setSnackbarOpen(true);
	};

	const handleToggleShareable = async (bot) => {
		try {
			await botService.toggleShareable(bot._id, !bot.isShareable);
			dispatch(
				setBots(
					bots.map((b) =>
						b._id === bot._id ? { ...b, isShareable: !b.isShareable } : b
					)
				)
			);
			setSnackbarMsg(
				`Bot is now ${!bot.isShareable ? "shareable" : "private"}`
			);
			setSnackbarOpen(true);
		} catch (err) {
			setSnackbarMsg("Failed to update shareable status");
			setSnackbarOpen(true);
		}
	};

	useEffect(() => {
		const fetchBots = async () => {
			try {
				dispatch(setLoading(true));
				const response = await botService.fetchBots();
				dispatch(setBots(response));
			} catch (error) {
				dispatch(setError(error.message));
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchBots();
	}, [dispatch]);

	if (error) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "300px",
					textAlign: "center",
				}}
			>
				<ErrorOutlineIcon sx={{ fontSize: 48, color: "error.main", mb: 2 }} />
				<Typography variant="h6" color="error" sx={{ mb: 1 }}>
					Failed to load bots
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
					{error}
				</Typography>
				<Button
					variant="contained"
					onClick={() => window.location.reload()}
					sx={{ textTransform: "none" }}
				>
					Try Again
				</Button>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
				Your Bots
			</Typography>

			{loading && !bots.length ? (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					{[1, 2].map((item) => (
						<Skeleton
							key={item}
							variant="rectangular"
							height={120}
							sx={{ borderRadius: 2 }}
						/>
					))}
				</Box>
			) : bots.length === 0 ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "300px",
						textAlign: "center",
					}}
				>
					<ChatBubbleOutlineIcon
						sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
					/>
					<Typography variant="h6" sx={{ mb: 1 }}>
						No bots available
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
						Create your first bot to get started
					</Typography>
				</Box>
			) : (
				<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
					{bots.map((bot) => (
						<Card
							key={bot._id}
							sx={{
								borderRadius: 2,
								boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s, box-shadow 0.2s",
								"&:hover": {
									transform: "translateY(-2px)",
									boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
								},
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
									<Avatar
										sx={{
											bgcolor: "primary.main",
											mr: 2,
											width: 40,
											height: 40,
										}}
									>
										{bot.name.charAt(0)}
									</Avatar>
									<Box>
										<Typography variant="h6" sx={{ fontWeight: 600 }}>
											{bot.name}
										</Typography>
										<Chip
											label={bot.status}
											size="small"
											color={
												bot.status === "ready"
													? "success"
													: bot.status === "failed"
													? "error"
													: "warning"
											}
											sx={{ height: 20, fontSize: "0.7rem" }}
										/>
									</Box>
								</Box>

								<Typography
									variant="body2"
									sx={{ mb: 2, color: "text.secondary" }}
								>
									{bot.description}
								</Typography>

								<Divider sx={{ my: 2 }} />

								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr 1fr",
										alignItems: "center",
										gap: 2,
										mt: 2,
									}}
								>
									<Button
										variant="contained"
										size="small"
										onClick={() => setSelectedBot(bot)}
										disabled={bot.status !== "ready"}
										sx={{
											textTransform: "none",
											borderRadius: "20px",
											width: "100%",
										}}
									>
										Chat
									</Button>

									<Tooltip title="Make bot shareable">
										<Switch
											checked={bot.isShareable}
											onChange={() => handleToggleShareable(bot)}
											color="primary"
											size="small"
											sx={{ mx: "auto" }}
											disabled={bot.status !== "ready"}
										/>
									</Tooltip>

									<Tooltip title="Copy shareable link">
										<IconButton
											onClick={() => handleCopyLink(bot._id)}
											size="small"
											color="primary"
											sx={{
												border: "1px solid",
												borderColor: "divider",
												borderRadius: 1,
												padding: "6px",
												mx: "auto",
											}}
											disabled={bot.status !== "ready" || !bot.isShareable}
										>
											<ContentCopyIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={() => setSnackbarOpen(false)}
				message={snackbarMsg}
			/>

			{selectedBot && (
				<ChatInterface bot={selectedBot} onClose={() => setSelectedBot(null)} />
			)}
		</Box>
	);
};

export default BotList;
