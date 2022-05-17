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
import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import JobModels from "./JobModels";
import AuthContext from "../../../store/auth-context";
import { ClassNames } from "@emotion/react";
const stackStyle = {
	display: "grid",
	gridTemplateColumns: "4% 13% 23% 28% 10% 18%",
	gap: 0.25,
	placeItems: "center",
	border: "1px solid rgba(0, 0, 0, 0.52)",
	borderRadius: 1,
	px: 1,
	py: 0.4,
	margin: 0.3,
	my: 0.5,
	background: "#0c172341",
};
const paperStyle = {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	backgroundColor: "rgba(255, 255, 255, 0.01)",
	borderRadius: 1,
	border: "1px solid rgba(0, 0, 0, 0.52)",
};

const Job = (props) => {
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;

	const stackStyle = {
		display: "grid",
		gridTemplateColumns: "4% 13% 23% 28% 10% 18%",
		gap: 0.25,
		placeItems: "center",
		border: "1px solid rgba(0, 0, 0, 0.52)",
		borderRadius: 1,
		px: 1,
		py: 0.4,
		margin: 0.3,
		my: 0.5,
		background: "#0c172341",
		width: isManager ? "auto" : "100%",
	};

	// console.log("job props", props);
	const onAdd = () => {
		console.log("adding to props.jobId:", props.jobId);
		props.onAddModel(props.jobId);
	};

	const onDeleteJob = () => {
		console.log("deleting job:", props.jobId);
		props.onDeleteJob(props.jobId);
	};

	const onRemoveModel = (email) => {
		if (!isManager) return;
		console.log("removing model with email:", email, "from job:", props.jobId);
		props.onRemoveModel(email, props.jobId);
	};

	const onAddExpense = () => {
		props.onAddExpense(props.jobId);
	};

	const renderJobModels = () => {
		if (!props.models) {
			return;
		}
		const jobModels = props.models.map((model) => {
			return (
				<JobModels
					key={model + Math.random() * 2}
					model={model}
					onDelete={onRemoveModel}
				/>
			);
		});
		return jobModels;
	};

	return (
		<Stack direction="row" sx={stackStyle}>
			<Box
				sx={{
					gridColumn: "1",
					placeSelf: "center start",
					display: "flex",
					justifyContent: "flex-start",
					paddingRight: "25%",
					minHeight: "1rem",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
				}}
			>
				<Paper
					sx={{
						...paperStyle,
						justifyContent: "center",
						flexWrap: "wrap",
						minWidth: "1.5rem",
						alignItems: "center",
					}}
				>
					<Typography variant="body1" sx={{ textAlign: "center" }}>
						{props.jobId}
					</Typography>
				</Paper>
			</Box>
			<Box
				sx={{
					px: 1,
					gridColumn: "2",
					placeSelf: "center",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
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
						{props.customer}
					</Typography>
				</Paper>
			</Box>

			{isManager && (
				<Box
					sx={{
						gridColumn: "3",
						display: "grid",
						placeItems: "center",
						flexWrap: "wrap",
					}}
				>
					{renderJobModels()}
					{isManager && (
						<Tooltip title="Add Model" placement="right">
							<IconButton
								size="small"
								sx={{
									opacity: "25%",
									"&:hover": {
										opacity: "65%",
									},
								}}
								onClick={onAdd}
							>
								<AddBoxIcon fontSize="sm" />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			)}
			<Box
				sx={{
					gridColumn: "4",
					display: "flex",
					justifyContent: "center",
					px: 6,
					flexWrap: "wrap",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
					borderLeft: "1px solid rgba(0, 0, 0, 0.52)",
					width: "100%",
				}}
			>
				<Paper
					sx={{
						...paperStyle,
						justifyContent: "center",
						alignItems: "center",
						px: 2,
					}}
				>
					<Typography variant="body1" sx={{ textAlign: "center" }}>
						{props.location}
					</Typography>
				</Paper>
			</Box>
			<Box
				sx={{
					gridColumn: "5",
					display: "flex",
					justifyContent: "center",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
				}}
			>
				<Paper
					sx={{
						...paperStyle,
						placeContent: "center",

						width: "auto",
						minWidth: "6rem",
					}}
				>
					<Typography variant="body1">{props.days} days</Typography>
				</Paper>
			</Box>
			<Box
				sx={{
					gridColumn: "6",
					placeContent: "center",
					maxHeight: "1.8rem",
					justifyContent: "center",
				}}
			>
				{props.comments && (
					<Paper
						sx={{
							...paperStyle,
							placeSelf: "center end",
							width: "auto",
							px: 1,
							minWidth: "4.5rem",
						}}
					>
						<Typography variant="body1">{props.comments}</Typography>
					</Paper>
				)}
				{!props.comments && (
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							alignItems: "center",
							width: "auto",
							minWidth: "4.5rem",
							maxWidth: "5.5rem",
							minHeight: "1.8rem",
						}}
					>
						<Typography variant="body1">{props.comments}</Typography>
					</Paper>
				)}
			</Box>

			{isManager && (
				<Box sx={{ display: "flex", placeSelf: "center end", gridColumn: 7 }}>
					<Tooltip title="Delete Job" placement="right">
						<IconButton
							size="small"
							onClick={onDeleteJob}
							sx={{
								"&:hover": {
									color: "darkred",
								},
							}}
						>
							<DeleteForeverRoundedIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			)}
			{!isManager && (
				<Tooltip title="Add Expense" placement="right">
					<IconButton
						size="small"
						sx={{
							gridColumn: "7",
							opacity: "45%",
							"&:hover": {
								opacity: "85%",
							},
						}}
						onClick={onAddExpense}
					>
						<AddBoxIcon fontSize="sm" />
					</IconButton>
				</Tooltip>
			)}
		</Stack>
	);
};

export default Job;
