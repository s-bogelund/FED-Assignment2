import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import { bodyContainer, containerStyle, largeBoxStyle } from "../styling";

const manager = {
	title: "Manager",
	description: "Create an additional manager to help manage your team",
	buttonText: "Create Manager",
};

const model = {
	title: "Model",
	description: "Create a new model to add more talent to your team",
	buttonText: "Create Model",
};

const hoverEffect = {
	transition: "all 0.15s ease-in-out",
	"&:hover": {
		transform: "scale(1.02)",
		boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.25)",
	},
};

const SelectUser = (props) => {
	const managerChosen = () => {
		choiceMade("manager");
	};

	const modelChosen = () => {
		choiceMade("model");
	};

	const choiceMade = (choice) => {
		props.onChoice(choice);
	};

	return (
		<Container
			sx={{ ...bodyContainer, flexDirection: "column", pt: -15, mt: -5 }}
		>
			<Container sx={{ pt: 8, pb: 6 }}>
				<Typography component="h1" variant="h2" align="center" sx={{ mb: 3 }}>
					User Creation
				</Typography>
				<Typography variant="h5" align="center" color="text.secondary">
					Choose which user you wish to create
				</Typography>
			</Container>
			<Container
				maxWidth="md"
				component="main"
				sx={{ p: 0, m: 0, alignItems: "center" }}
			>
				<Grid
					container
					spacing={6}
					alignItems="center"
					justifyContent="center"
					sx={{ p: 0 }}
				>
					{/* --------- Manager ----------- */}
					<Grid item md={6}>
						<Card
							sx={{
								...containerStyle,
								...hoverEffect,
								cursor: "pointer",
								height: "21rem",
							}}
							onClick={managerChosen}
						>
							<CardHeader
								title={manager.title}
								subheader={manager.description}
								titleTypographyProps={{ align: "center" }}
								subheaderTypographyProps={{
									align: "center",
								}}
							/>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "baseline",
										p: 0,
									}}
								>
									<AdminPanelSettingsIcon
										sx={{ fontSize: 120 }}
									></AdminPanelSettingsIcon>
								</Box>
							</CardContent>
							<CardActions>
								<Button fullWidth>{manager.buttonText}</Button>
							</CardActions>
						</Card>
					</Grid>
					{/* {-------------MODEL----------} */}
					<Grid item md={6}>
						<Card
							sx={{
								...containerStyle,
								...hoverEffect,
								cursor: "pointer",
								height: "21rem",
							}}
							onClick={modelChosen}
						>
							<CardHeader
								title={model.title}
								subheader={model.description}
								titleTypographyProps={{ align: "center" }}
								subheaderTypographyProps={{
									align: "center",
								}}
							/>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "baseline",
										p: 0,
									}}
								>
									<PersonIcon sx={{ fontSize: 120 }}></PersonIcon>
								</Box>
							</CardContent>
							<CardActions>
								<Button onClick={modelChosen} fullWidth>
									{model.buttonText}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default SelectUser;
