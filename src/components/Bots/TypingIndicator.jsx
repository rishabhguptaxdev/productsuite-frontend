import { Box, Typography } from "@mui/material";

const TypingIndicator = () => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<Typography variant="body2" color="text.secondary">
				Bot is typing
			</Typography>
			<Box sx={{ display: "flex", gap: 0.5 }}>
				{[0, 1, 2].map((i) => (
					<Box
						key={i}
						sx={{
							width: 8,
							height: 8,
							borderRadius: "50%",
							backgroundColor: "grey.500",
							animation: "bounce 1s infinite",
							animationDelay: `${i * 0.2}s`,
							"@keyframes bounce": {
								"0%, 100%": {
									transform: "translateY(0)",
								},
								"50%": {
									transform: "translateY(-5px)",
								},
							},
						}}
					/>
				))}
			</Box>
		</Box>
	);
};

export default TypingIndicator;
