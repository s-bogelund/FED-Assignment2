import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React from "react";
import { Box } from "@mui/system";

const Job = (props) => {
	const paperStyle = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.03)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 1,
	};

	const onDelete = () => {
		console.log("Delete Job");
		props.onDeleteJob(props.id);
	};

	const onEdit = () => {
		console.log("Edit Job");
	};

	return (
		<Stack
			direction="row"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				px: 1,
				gap: 1,
			}}
		>
			<Paper sx={{ ...paperStyle, width: "40%" }}>
				<Typography variant="body1">{props.name}</Typography>
			</Paper>
			<Box sx={{ display: "flex", width: "40%", gap: 1 }}>
				<Box sx={{ width: "80%" }}>
					<Paper sx={{ ...paperStyle, justifyContent: "center", wrap: "wrap" }}>
						<Typography variant="body1">{props.company}</Typography>
					</Paper>
				</Box>
				<Box sx={{ display: "flex", width: "50%", maxHeight: "1.4em" }}>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							width: "auto",
						}}
					>
						<Typography variant="body1">{props.salary}kr</Typography>
					</Paper>
				</Box>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<IconButton size="small" onClick={onDelete}>
					<DeleteForeverRoundedIcon fontSize="small" />
				</IconButton>
				<IconButton size="small" onClick={onEdit}>
					<EditRoundedIcon fontSize="small" />
				</IconButton>
			</Box>
		</Stack>
	);
};

export default Job;
