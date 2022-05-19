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
import { hoverEffect } from "../../styling";
const paperStyle = {
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	backgroundColor: "rgba(255, 255, 255, 0.01)",
	borderRadius: 1,
	border: "1px solid rgba(0, 0, 0, 0.52)",
};
const stackManager = {
	display: "grid",
	gridTemplateColumns: "5% 13% 23% 28% 10% 18%",
	gap: 0.25,
	placeItems: "center",
	border: "1px solid rgba(0, 0, 0, 0.52)",
	borderRadius: 1,
	px: 1,
	py: 0.4,
	margin: 0.3,
	my: 0.5,
	background: "#0c172341",
	width: "auto",
	height: "auto",
};

const stackModel = {
	display: "grid",
	gridTemplateColumns: "6.5% 23% 24% 19% 20%",
	gap: 0.25,
	placeItems: "center",
	border: "1px solid rgba(0, 0, 0, 0.52)",
	borderRadius: 1,
	px: 1,
	py: 0.4,
	margin: 0.3,
	my: 0.5,
	background: "#0c172341",
	width: "100%",
};

const Job = (props) => {
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;
	const [daysTooltip, setDaysTooltip] = useState("");

	const onAdd = () => {
		props.onAddModel(props.jobId);
	};

	const onDeleteJob = () => {
		props.onDeleteJob(props.jobId);
	};

	const onRemoveModel = (email) => {
		if (!isManager) return;
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

	const handleDaysHover = () => {
		const date = new Date(props.startDate);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		setDaysTooltip(`Startdate : ${day}/${month}/${year}`);
	};

	return (
		<Stack direction="row" sx={isManager ? stackManager : stackModel}>
			<Box
				sx={{
					gridColumn: 1,
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
					width: "100%",
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
					gridColumn: isManager ? 4 : "3",
					display: "flex",
					justifyContent: "center",
					px: 6,
					flexWrap: "wrap",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
					borderLeft: isManager ? "1px solid rgba(0, 0, 0, 0.52)" : "none",
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
					gridColumn: "isManager ? 5 : 4",
					display: "flex",
					justifyContent: "center",
					borderRight: "1px solid rgba(0, 0, 0, 0.52)",
				}}
			>
				<Tooltip title={daysTooltip} placement="right">
					<Paper
						sx={{
							...paperStyle,
							placeContent: "center",

							width: "auto",
							minWidth: "6rem",
							transition: "all 0.15s ease-in-out",
							"&:hover": {
								transform: "scale(1.05)",
								cursor: "pointer",
								boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.32)",
							},
						}}
						onMouseEnter={handleDaysHover}
					>
						<Typography variant="body1">{props.days} days</Typography>
					</Paper>
				</Tooltip>
			</Box>
			<Box
				sx={{
					gridColumn: isManager ? 6 : "5 / span 2",
					placeContent: "center",
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
