import {
	Box,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { bodyContainer, largeBoxStyle } from "../components/styling";
import { getUsers } from "../data/handleLocalStorage";

const Login = () => {
	const handleLoginSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<Container component="main" sx={bodyContainer}>
			<CssBaseline />
			<Box
				sx={{
					...largeBoxStyle,
					flexDirection: "column",
					mt: "-4rem",
				}}
			>
				<Typography variant="h3" color="inherit">
					Login
				</Typography>
				<Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
					<TextField
						autoFocus
						fullWidth
						margin="normal"
						required
						id="email"
						label="Email Address"
						name="email"
					/>
					<TextField
						fullWidth
						margin="normal"
						required
						id="password"
						label="Password"
						name="password"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
						<Typography variant="h6">Sign In</Typography>
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
