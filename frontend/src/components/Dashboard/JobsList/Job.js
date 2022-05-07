import {
	Button,
	IconButton,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useState } from "react";
import { Box } from "@mui/system";
import JobModels from "./JobModels";

const Job = (props) => {
	const paperStyle = () => {
		if (!props.isHeader) {
			return {
				display: "flex",
				justifyContent: "flex-start",
				alignItems: "center",
				backgroundColor: "rgba(255, 255, 255, 0.01)",
				borderRadius: 1,
				border: "1px solid rgba(0, 0, 0, 0.52)",
				px: 1,
			};
		} else {
			return {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(255, 255, 255, 0.73)",
				borderRadius: 1,
				border: "1px solid rgba(0, 0, 0, 0.52)",
				px: 1,
			};
		}
	};

	const onDeleteJob = () => {
		console.log("Delete Job");
		props.onDeleteJob(props.id);
	};

	const onEdit = () => {
		console.log("Edit Job");
	};

	const renderJobModels = () => {
		const jobModels = props.models.map((model) => {
			return <JobModels key={model} model={model} />;
		});
		return jobModels;
	};

	return (
		<Stack
			direction="row"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				border: "1px solid rgba(0, 0, 0, 0.52)",
				borderRadius: 1,
				px: 1,
				py: 0.4,
				margin: 0.3,
				my: 0.5,
				background: "#0c172341",
			}}
		>
			<Box
				sx={{
					width: "40%",
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{renderJobModels()}
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
							...paperStyle(),
							justifyContent: "center",
							flexWrap: "wrap",
							minWidth: "7em",
						}}
					>
						<Typography variant="body1">{props.company}</Typography>
					</Paper>
				</Box>
				<Box sx={{ display: "flex", width: "50%", maxHeight: "1.8em" }}>
					<Paper
						sx={{
							...paperStyle(),
							justifyContent: "center",
							alignItems: "center",
							width: "auto",
							minWidth: "4.5em",
						}}
					>
						<Typography variant="body1">
							{props.salary}
							{props.isHeader ? "" : "kr"}
						</Typography>
					</Paper>
				</Box>
			</Box>
			{/* Renders the edit and delete buttons if not the header */}
			{!props.isHeader && (
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Tooltip title="Delete Job" placement="top">
						<IconButton size="small" onClick={onDeleteJob}>
							<DeleteForeverRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Edit Job" placement="right">
						<IconButton size="small" onClick={onEdit}>
							<EditRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			)}
		</Stack>
	);
};

export default Job;
