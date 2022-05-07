import {
	Button,
	Container,
	IconButton,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useState } from "react";
import { Box } from "@mui/system";
import JobModels from "./JobModels";

const Job = (props) => {
	const stackStyle = () => {
		if (props.isHeader)
			return {
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				placeItems: "center",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "1.7rem",
				"&paperStyle": {
					border: "none",
				},
			};
		else
			return {
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
			};
	};

	const paperStyle = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.01)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 1,
	};

	const onAdd = () => {
		console.log("add");
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
		<Stack direction="row" sx={stackStyle}>
			<Box
				sx={{
					width: "40%",
					display: "flex",
					flexWrap: "wrap",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
					alignItems: "center",
				}}
			>
				{renderJobModels()}{" "}
				{!props.isHeader && (
					<Tooltip title="Add Model" placement="right">
						<IconButton
							size="small"
							sx={{
								opacity: "25%",
								"&:hover": {
									opacity: "100%",
								},
							}}
							onClick={onAdd}
						>
							<AddBoxIcon fontSize="sm" />
						</IconButton>
					</Tooltip>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					width: "55%",
					gap: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
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
							flexWrap: "wrap",
							minWidth: "7rem",
							alignItems: "center",
						}}
					>
						<Typography variant="body1" sx={{ textAlign: "center" }}>
							{props.company}
						</Typography>
					</Paper>
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "50%",
						maxHeight: "1.8rem",
						justifyContent: "center",
					}}
				>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							alignItems: "center",
							width: "auto",
							minWidth: "4.5rem",
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
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Tooltip title="Delete Job" placement="top">
						<IconButton size="small" onClick={onDeleteJob}>
							<DeleteForeverRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title="Edit Job" placement="right">
						<IconButton size="small" onClick={onEdit}>
							<EditRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip> */}
				</Box>
			)}
		</Stack>
	);
};

export default Job;
