import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useState } from "react";
import { Box } from "@mui/system";

const Job = (props) => {
	const [isHovering, setIsHovering] = useState(false);
	const paperStyle = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.03)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 1,
	};

	const onDeleteJob = () => {
		console.log("Delete Job");
		props.onDeleteJob(props.id);
	};

	const onEdit = () => {
		console.log("Edit Job");
	};

	const onModelHover = (event) => {
		console.log("Model Hover : ", event.type);
		if (event.type === "moueseenter") setIsHovering(true);
		if (event.type === "mouseleave") setIsHovering(false);
	};

	return (
		<Stack
			direction="row"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				px: 1,
				py: 0.4,
				gap: 1,
				margin: 0.5,
				background: "#3f3f3f",
			}}
		>
			<Box sx={{ width: "40%", display: "flex", wrap: "flexWrap" }}>
				<Paper
					onMouseEnter={onModelHover}
					onMouseLeave={onModelHover}
					sx={{
						...paperStyle,
						cursor: "pointer",
						"&:hover": {
							backgroundColor: "rgba(255, 25, 25, 0.6)",
						},
					}}
				>
					<Typography variant="body1">{props.name}</Typography>
				</Paper>
			</Box>
			<Box sx={{ display: "flex", width: "40%", gap: 1 }}>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							wrap: "wrap",
							minWidth: "7em",
						}}
					>
						<Typography variant="body1">
							{isHovering && props.company}
						</Typography>
						{isHovering && "X"}
					</Paper>
				</Box>
				<Box sx={{ display: "flex", width: "50%", maxHeight: "1.8em" }}>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							alignItems: "center",
							width: "auto",
						}}
					>
						<Typography variant="body1">{props.salary}kr</Typography>
					</Paper>
				</Box>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<IconButton size="small" onClick={onDeleteJob}>
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
