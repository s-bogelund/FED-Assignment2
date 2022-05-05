import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	return (
		<Container component="main">
			<Box>
				<h1>Home</h1>
			</Box>
		</Container>
	);
};

export default Home;
