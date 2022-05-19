import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { bodyContainer, largeBoxStyle } from "../styling";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateManager = (props) => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		props.onNewUser(user, "manager");
		navigate("/");
	};

	return (
		<Container component="main" sx={bodyContainer}>
			<Box
				sx={{
					...largeBoxStyle,
					flexDirection: "column",
					mt: "4rem",
					width: "700px",
					minWidth: "50%",
				}}
			>
				<Typography variant="h3">Create New Manager</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						autoFocus
						onInput={(event) =>
							setUser({ ...user, firstName: event.target.value })
						}
						fullWidth
						margin="normal"
						required
						value={user.firstName}
						id="firstName"
						label="First Name"
					/>
					<TextField
						fullWidth
						onInput={(event) =>
							setUser({ ...user, lastName: event.target.value })
						}
						type="text"
						margin="normal"
						value={user.lastName}
						required
						id="lastName"
						label="Last Name"
					/>

					<TextField
						fullWidth
						onInput={(event) => setUser({ ...user, email: event.target.value })}
						type="email"
						margin="normal"
						value={user.email}
						required
						id="email"
						label="Email"
					/>
					<TextField
						fullWidth
						onInput={(event) =>
							setUser({ ...user, password: event.target.value })
						}
						type="password"
						margin="normal"
						value={user.password}
						required
						id="password"
						label="Password"
					/>
					<Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>
						<Typography variant="button">Create User</Typography>
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default CreateManager;
