import { Container, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { bodyContainer } from "../components/styling";

const Home = () => {
	const navigate = useNavigate();

	return (
		<Container component="main" sx={bodyContainer}>
			<CssBaseline />
			<Box>
				<Typography variant="h4">You are not logged in</Typography>
				<Typography sx={{ mt: 3 }} variant="body1">
					Please login to use this application
				</Typography>
			</Box>
		</Container>
	);
};

export default Home;
