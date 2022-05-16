import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { bodyContainer, largeBoxStyle } from "../styling";

const basicBoxStyle = {
	display: "flex",
	gap: 2,
};

const CreateModel = (props) => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneNo: "",
		addresLine1: "",
		addresLine2: "",
		city: "",
		zip: "",
		country: "",
		birthDate: "",
		nationality: "",
		height: null,
		shoeSize: null,
		hairColor: "",
		eyeColor: "",
		comments: "",
	});
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("onNewModel called", user);
		props.onNewUser(user, "model");
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
				<Typography variant="h3">Create New Model</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Box sx={basicBoxStyle}>
						<TextField
							autoFocus
							onInput={(event) =>
								setUser({ ...user, firstName: event.target.value })
							}
							type="text"
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
					</Box>

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
					<TextField
						fullWidth
						onInput={(event) =>
							setUser({ ...user, phoneNo: event.target.value })
						}
						type="tel"
						margin="normal"
						value={user.phoneNo}
						required
						id="phoneNo"
						label="Phone Number"
					/>
					<Box sx={basicBoxStyle}>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, addressLine1: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.addressLine1}
							required
							id="addressLine1"
							label="Address Line 1"
						/>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, addressLine2: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.addressLine2}
							id="addressLine2"
							label="Address Line 2"
						/>
					</Box>
					<Box sx={{ display: "flex", gap: 3 }}>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, city: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.city}
							required
							id="city"
							label="City"
						/>
						<TextField
							fullWidth
							required
							onInput={(event) => setUser({ ...user, zip: event.target.value })}
							type="number"
							margin="normal"
							value={user.zip}
							id="zip"
							label="Zip Code"
						/>
					</Box>
					<Box sx={basicBoxStyle}>
						<TextField
							fullWidth
							required
							onInput={(event) =>
								setUser({ ...user, country: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.country}
							id="country"
							label="Country"
						/>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, nationality: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.nationality}
							id="country"
							label="Nationality"
						/>
					</Box>
					<Typography sx={{ pt: 4, pb: 2 }} variant="h5">
						Personal Characteristics
					</Typography>
					<Box sx={basicBoxStyle}>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, birthDate: event.target.value })
							}
							InputLabelProps={{ shrink: true, required: true }}
							type="date"
							margin="normal"
							value={user.birthDate}
							id="birthDate"
							label="Birthday"
						/>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, height: event.target.value })
							}
							type="number"
							margin="normal"
							value={user.height}
							id="height"
							label="Height in CM"
						/>
					</Box>
					<Box sx={basicBoxStyle}>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, hairColor: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.hairColor}
							id="hairColor"
							label="Hair Color"
						/>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, eyeColor: event.target.value })
							}
							type="text"
							margin="normal"
							value={user.eyeColor}
							id="eyeColor"
							label="Eye Color"
						/>
						<TextField
							fullWidth
							onInput={(event) =>
								setUser({ ...user, shoeSize: event.target.value })
							}
							type="number"
							margin="normal"
							value={user.shoeSize}
							id="shoeSize"
							label="Shoe Size"
						/>
					</Box>
					<TextField
						fullWidth
						onInput={(event) =>
							setUser({ ...user, comments: event.target.value })
						}
						type="text"
						multiline
						minRows={2}
						margin="normal"
						value={user.comments}
						id="comments"
						label="Comments"
					/>

					<Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>
						<Typography variant="button">Create User</Typography>
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default CreateModel;
