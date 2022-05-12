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
const paperStyle = {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	backgroundColor: "rgba(255, 255, 255, 0.01)",
	borderRadius: 1,
	border: "1px solid rgba(0, 0, 0, 0.52)",
	px: 1,
};

const Job = (props) => {
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;

	const onAdd = () => {
		props.onAddModel(props.id);
	};

	const onDeleteJob = () => {
		props.onDeleteJob(props.id);
	};

	const onRemoveModel = (model) => {
		if (!isManager) return;
		props.onRemoveModel(model, props.id);
	};

	const onAddExpense = () => {
		props.onAddExpense(props.id);
	};

	const renderJobModels = () => {
		if (!props.models) {
			console.log("no models");
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
					display: "flex",
					justifyContent: "flex-start",
					paddingRight: "1%",
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
					display: "flex",
					width: "96%",
					gap: 1,
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						px: 2,
						justifyContent: "center",
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

				<Box
					sx={{
						width: "35%",
						display: "flex",
						flexWrap: "wrap",
						borderRight: "1px solid rgba(0, 0, 0, 0.52)",
						alignItems: "center",
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
				<Box
					sx={{
						width: "50%",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						borderRight: "1px solid rgba(0, 0, 0, 0.52)",
						alignItems: "center",
					}}
				>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							flexWrap: "wrap",
							minWidth: "8rem",
							alignItems: "center",
						}}
					>
						<Typography variant="body1" sx={{ textAlign: "center" }}>
							{props.location}
						</Typography>
					</Paper>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						minWidth: "15%",
						borderRight: "1px solid rgba(0, 0, 0, 0.52)",
					}}
				>
					<Paper
						sx={{
							...paperStyle,
							justifyContent: "center",
							alignItems: "center",
							width: "auto",
							minWidth: "6rem",
						}}
					>
						<Typography variant="body1">{props.days} days</Typography>
					</Paper>
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "40%",
						maxHeight: "1.8rem",
						justifyContent: "center",
					}}
				>
					{props.comments && (
						<Paper
							sx={{
								...paperStyle,
								justifyContent: "center",
								alignItems: "center",
								width: "auto",
								minWidth: "4.5rem",
							}}
						>
							<Typography variant="body1">{props.comments}</Typography>
						</Paper>
					)}
				</Box>
			</Box>

			{isManager && (
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
