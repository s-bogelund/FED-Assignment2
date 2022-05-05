import { Button, Paper, Stack, Typography } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import React from "react";

const Job = (props) => {
	const paperStyle = {
		width: "50%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		background: "primary",
		px: 1,
	};

	return (
		<Stack
			direction="row"
			sx={{
				background: "rgba(255, 255, 255, 0.15)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				px: 1,
				gap: 2,
			}}
		>
			<Paper sx={paperStyle}>
				<Typography variant="body1">{props.name}</Typography>
			</Paper>
			<Paper sx={{ ...paperStyle, width: "auto", maxWidth: "25%" }}>
				<Typography variant="body1">{props.company}</Typography>
			</Paper>
			<Paper sx={{ ...paperStyle, width: "auto", maxWidth: "15%" }}>
				<Typography variant="body1">{props.salary}kr</Typography>
			</Paper>
			<Button>
				<DeleteForeverRoundedIcon />
			</Button>
		</Stack>
	);
};

export default Job;
