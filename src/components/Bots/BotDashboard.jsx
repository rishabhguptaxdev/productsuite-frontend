import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	showCreateBot,
	showViewBots,
	clearMessages,
} from "../../redux/botSlice";
import CreateBot from "./CreateBot";
import BotList from "./BotList";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";

const BotDashboard = () => {
	const dispatch = useDispatch();
	const { currentView, error, success } = useSelector((state) => state.bot);

	useEffect(() => {
		return () => {
			dispatch(clearMessages());
		};
	}, [dispatch]);

	const handleCloseSnackbar = () => {
		dispatch(clearMessages());
	};

	return (
		<Box
			sx={{
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "24px",
				backgroundColor: "#f9fafb",
				minHeight: "100vh",
			}}
		>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					fontWeight: 700,
					mb: 3,
					color: "primary.main",
				}}
			>
				BotBuilder
			</Typography>

			<Box
				sx={{
					display: "flex",
					gap: 2,
					mb: 4,
					borderBottom: "1px solid",
					borderColor: "divider",
					pb: 2,
				}}
			>
				<Button
					variant={currentView === "create" ? "contained" : "outlined"}
					onClick={() => dispatch(showCreateBot())}
					sx={{
						fontWeight: 600,
						textTransform: "none",
						fontSize: "1rem",
					}}
				>
					Create Bot
				</Button>
				<Button
					variant={currentView === "view" ? "contained" : "outlined"}
					onClick={() => dispatch(showViewBots())}
					sx={{
						fontWeight: 600,
						textTransform: "none",
						fontSize: "1rem",
					}}
				>
					View Bots
				</Button>
			</Box>

			<Box
				sx={{
					backgroundColor: "white",
					borderRadius: 2,
					boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
					p: 4,
				}}
			>
				{currentView === "create" && <CreateBot />}
				{currentView === "view" && <BotList />}
			</Box>

			<Snackbar
				open={!!error || !!success}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={error ? "error" : "success"}
					sx={{ width: "100%" }}
				>
					{error || success}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default BotDashboard;
