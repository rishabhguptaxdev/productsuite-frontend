import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { botService } from "../../services/botService";
import { showViewBots, setSuccess, setError } from "../../redux/botSlice";
import {
	Box,
	Button,
	TextField,
	Typography,
	CircularProgress,
	Paper,
	Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const CreateBot = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.bot);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [files, setFiles] = useState([]);
	const [dragActive, setDragActive] = useState(false);

	const handleDrag = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setFiles(Array.from(e.dataTransfer.files));
		}
	}, []);

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFiles(Array.from(e.target.files));
		}
	};

	const removeFile = (index) => {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await botService.createBot(name, description, files);
			dispatch(setSuccess("Bot created successfully!"));
			setName("");
			setDescription("");
			setFiles([]);
			setTimeout(() => dispatch(showViewBots()), 1500);
		} catch (error) {
			dispatch(setError(error.message));
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ maxWidth: "800px", mx: "auto" }}
		>
			<Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 600 }}>
				Create a New Bot
			</Typography>

			<Box sx={{ mb: 4 }}>
				<Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
					Bot Name *
				</Typography>
				<TextField
					fullWidth
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					placeholder="Enter bot name"
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "8px",
						},
					}}
				/>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
					Bot Description (Optional)
				</Typography>
				<TextField
					fullWidth
					variant="outlined"
					multiline
					rows={3}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Describe what this bot does"
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "8px",
						},
					}}
				/>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
					Upload Files *
				</Typography>

				<Paper
					variant="outlined"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					sx={{
						border: dragActive ? "2px dashed #1976d2" : "2px dashed #e0e0e0",
						borderRadius: "8px",
						p: 4,
						textAlign: "center",
						mb: 2,
						backgroundColor: dragActive
							? "rgba(25, 118, 210, 0.04)"
							: "transparent",
						transition: "all 0.2s ease",
					}}
				>
					<CloudUploadIcon
						sx={{
							fontSize: 40,
							color: dragActive ? "primary.main" : "text.secondary",
							mb: 1,
						}}
					/>
					<Typography sx={{ mb: 1 }}>
						Drag and drop files here or click to browse
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						Supports PDFs, PPTs, and Videos
					</Typography>
					<Button
						variant="outlined"
						component="label"
						sx={{ textTransform: "none" }}
					>
						Select Files
						<input
							type="file"
							hidden
							multiple
							accept=".pdf,.ppt,.pptx,.mp4"
							onChange={handleFileChange}
						/>
					</Button>
				</Paper>

				{files.length > 0 && (
					<Box sx={{ mt: 2 }}>
						<Typography variant="body2" sx={{ mb: 1 }}>
							Selected files:
						</Typography>
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
							{files.map((file, index) => (
								<Chip
									key={index}
									label={file.name}
									onDelete={() => removeFile(index)}
									deleteIcon={<CloseIcon />}
									variant="outlined"
									sx={{
										"& .MuiChip-deleteIcon": {
											fontSize: "16px",
										},
									}}
								/>
							))}
						</Box>
					</Box>
				)}
			</Box>

			<Button
				type="submit"
				variant="contained"
				size="large"
				fullWidth
				disabled={loading || !name || files.length === 0}
				sx={{
					py: 1.5,
					borderRadius: "8px",
					fontSize: "1rem",
					fontWeight: 600,
					textTransform: "none",
				}}
			>
				{loading ? <CircularProgress size={24} /> : "Create Bot"}
			</Button>
		</Box>
	);
};

export default CreateBot;
