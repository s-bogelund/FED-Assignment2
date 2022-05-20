import CreateModel from "../components/CreateUser/CreateModel";
import SelectUser from "../components/CreateUser/SelectUser";
import React, { useState } from "react";
import CreateManager from "../components/CreateUser/CreateManager";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Container } from "@mui/material";
import { bodyContainer } from "../components/styling";
import { addManager } from "../api/managerFetching";
import { addModel } from "../api/modelsFetching";

const buttonHover = {
	backgroundColor: "rgba(0, 0, 0, 0.01)",
	transition: "all 0.15s ease-in-out",
	"&:hover": {
		backgroundColor: "rgba(222, 222, 222, 0.15)",
	},
};

const CreateUser = (props) => {
	const [showChoice, setShowChoice] = useState(true);
	const [showModel, setShowModel] = useState(false);
	const [showManager, setShowManager] = useState(false);

	const handleBack = () => {
		setShowChoice(true);
		setShowModel(false);
		setShowManager(false);
	};

	const handleNewUser = async (user, role) => {
		let success = false;
		if (role === "manager") {
			success = await addManager(user);
		}
		if (role === "model") success = await addModel(user);

	};

	const handleChoice = (choice) => {

		if (choice === "model") {
			setShowChoice(false);
			setShowModel(true);
		} else if (choice === "manager") {
			setShowChoice(false);
			setShowManager(true);
		}
	};

	return (
		<Container
			sx={{
				...bodyContainer,
				flexDirection: "column",
				position: "relative",
			}}
		>
			{!showChoice && (
				<Button
					onClick={handleBack}
					sx={{
						...buttonHover,
						display: "flex",
						justifyContent: "center",
						textAlign: "center",
						size: "large",
						height: "5rem",
						width: "5rem",
						fontSize: 160,
						mt: 12,
						position: "absolute",
						top: 30,
						left: 150,
						opacity: 0.5,
						borderRadius: "12px",
					}}
				>
					<ArrowBackIosNewIcon sx={{ fontSize: 60 }} />
				</Button>
			)}
			{showChoice && <SelectUser onChoice={handleChoice} />}
			{showModel && <CreateModel onNewUser={handleNewUser} />}
			{showManager && <CreateManager onNewUser={handleNewUser} />}
		</Container>
	);
};

export default CreateUser;
