import { ModelTrainingSharp } from "@mui/icons-material";
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { readUsers } from "../../api/localStorageHandler";
import { containerStyle, hoverEffect } from "../styling";

const ExpensesList = (props) => {
	const [expenses, setExpenses] = useState(props.expenses || []);	
	const [models, setModels] = useState(props.models);
	const [hoverName, setHoverName] = useState("");

	useEffect(() => {
		setExpenses(props.expenses);
		setModels(props.models);
	}, [props.expenses]);

	const idHover = {
		...hoverEffect,
		"&:hover": {
			backgroundColor: "#f5f5f502",
			fontSize: "1.1rem",
		},
	};

	const getModelName = (modelId) => {
		const model = readUsers().find((model) => model.id === modelId);
		return `Model: ${model ? model.name : ""}`;
	};

	const handleOnMouseEnter = (e) => {
		const id = e.target.innerText;
		const model = readUsers().find(
			(model) => model.efModelId.toString() === id
		);
		const name = `${model.firstName} ${model.lastName}`;
		setHoverName(name);
	};

	return (
		<Container
			maxWidth="xxl"
			sx={{
				...containerStyle,
				flexDirection: "column",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Typography variant="h5">Expenses</Typography>
			</Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Expense ID</TableCell>
						<TableCell align="center">Model ID(Name)</TableCell>
						<TableCell align="center">Job ID</TableCell>
						<TableCell align="center">Date</TableCell>
						<TableCell align="center">Text</TableCell>
						<TableCell align="center">Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses.map((expense) => (
						<TableRow
							key={uuid()}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							<TableCell component="th" scope="row" sx={{ width: "10%" }}>
								{expense.efExpenseId}
							</TableCell>
							<Tooltip title={hoverName}>
								<TableCell
									onMouseEnter={handleOnMouseEnter}
									align="center"
									sx={{ ...idHover, width: "10%", cursor: "pointer" }}
								>
									{expense.modelId}
								</TableCell>
							</Tooltip>
							<TableCell align="center" sx={{ width: "10%" }}>
								{expense.jobId}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{new Date(expense.date).toLocaleDateString()}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{expense.text}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{expense.amount}kr
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

export default ExpensesList;
