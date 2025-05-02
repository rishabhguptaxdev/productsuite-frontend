import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	CircularProgress,
	Snackbar,
} from "@mui/material";
import { botService } from "../../services/botService";

const CreateBot = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [files, setFiles] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await botService.createBot(name, description, files);
			setSuccessMessage("Bot created successfully!");
			setName("");
			setDescription("");
			setFiles([]);
		} catch (error) {
			console.error("Error creating bot:", error);
			setErrorMessage("Error creating bot. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	return (
		<Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
			<Typography variant="h5" gutterBottom>
				Create New DocsBot
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Bot Name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<TextField
					label="Description"
					variant="outlined"
					fullWidth
					margin="normal"
					multiline
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<Box sx={{ my: 2 }}>
					<Typography variant="subtitle1" gutterBottom>
						Upload PDF Documents
					</Typography>
					<input
						type="file"
						accept=".pdf"
						multiple
						onChange={handleFileChange}
						required
					/>
				</Box>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={loading}
					sx={{ mt: 2 }}
				>
					{loading ? <CircularProgress size={24} /> : "Create Bot"}
				</Button>
			</form>

			{/* Success Snackbar */}
			<Snackbar
				open={!!successMessage}
				autoHideDuration={4000}
				onClose={() => setSuccessMessage("")}
				message={successMessage}
			/>

			{/* Error Snackbar */}
			<Snackbar
				open={!!errorMessage}
				autoHideDuration={4000}
				onClose={() => setErrorMessage("")}
				message={errorMessage}
			/>
		</Paper>
	);
};

export default CreateBot;
