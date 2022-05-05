import { Container, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<Container component="main">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 10,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Typography variant="h4">You are not logged in</Typography>
				<Typography sx={{ mt: 3 }} variant="body1">
					Please login to use this application
				</Typography>
			</Box>
		</Container>
	);
};

export default Home;
