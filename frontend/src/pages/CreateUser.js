import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { bodyContainer, largeBoxStyle } from "../components/styling";
import { saveUser } from "../data/handleLocalStorage";
import { v4 as uuid } from "uuid";

const CreateUser = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [isManager, setIsManager] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({
			email,
			password,
			name,
			phone,
			address,
			isManager,
		});

		const newUser = {
			id: uuid(),
			name: name,
			role: isManager ? "Manager" : "Model",
			email: email,
			password: password,
			phone: phone,
			address: address,
		};

		saveUser(newUser);
		props.onNewUser(newUser);
	};

	return (
		<Container component="main" sx={bodyContainer}>
			<Box
				sx={{
					...largeBoxStyle,
					flexDirection: "column",
					mt: "-4rem",
					width: "700px",
					minWidth: "50%",
				}}
			>
				<Typography variant="h3">Create New User</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						autoFocus
						onInput={(event) => setName(event.target.value)}
						fullWidth
						margin="normal"
						required
						value={name}
						id="name"
						label="Full Name"
						name="name"
					/>
					<TextField
						fullWidth
						onInput={(event) => setEmail(event.target.value)}
						type="email"
						margin="normal"
						value={email}
						required
						id="email"
						label="Email"
						name="email"
					/>
					<TextField
						fullWidth
						onInput={(event) => setPassword(event.target.value)}
						type="password"
						margin="normal"
						value={password}
						required
						id="password"
						label="Password"
						name="password"
					/>
					<TextField
						fullWidth
						onInput={(event) => setAddress(event.target.value)}
						type="address"
						margin="normal"
						value={address}
						required
						id="address"
						label="Address"
						name="address"
					/>
					<TextField
						fullWidth
						onInput={(event) => setPhone(event.target.value)}
						type="phone"
						margin="normal"
						value={phone}
						required
						id="phone"
						label="Phone"
						name="phone"
					/>
					<FormControlLabel
						sx={{ alignSelf: "flex-start", paddingBottom: 4 }}
						control={
							<Checkbox
								checked={isManager}
								onClick={() => setIsManager(true)}
							/>
						}
						label="Are you creating a manager?"
					/>
					<Button type="submit" variant="contained" fullWidth>
						<Typography variant="button">Create User</Typography>
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default CreateUser;
