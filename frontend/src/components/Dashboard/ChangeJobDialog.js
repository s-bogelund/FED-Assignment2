import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { getSuggestedQuery } from "@testing-library/react";
import React, { useContext, useState } from "react";
import { readUser } from "../../api/localStorageHandler";
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";

const ChangeJobDialog = (props) => {
	const [expense, setExpense] = useState(0);
	const [description, setDescription] = useState("");
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;

	const handleModelSelected = (event) => {
		props.onModelSelected(event.target.id);
	};

	const handleAddExpense = (event) => {
		event.preventDefault();
		const modelId = jwt_decode(ctx.loginState.token).ModelId;

		props.onAddExpense({
			modelId: modelId,
			date: new Date(),
			text: description,
			amount: expense,
		});
	};

	const modelList = props.models.map((model) => {
		return (
			<ListItem button onClick={handleModelSelected} key={model} id={model}>
				{model}
			</ListItem>
		);
	});

	return (
		<Dialog
			open={props.open}
			onClose={props.onCancel}
			sx={{
				"&.container": {
					backgroundColor: "red",
				},
			}}
		>
			<DialogTitle>{props.title}</DialogTitle>
			{/* // What the manager sees */}
			{isManager && (
				<DialogContent>
					<DialogContentText>
						Select the model you want to add to the job:
					</DialogContentText>
					<List>{modelList}</List>
				</DialogContent>
			)}
			{/* What a model sees */}
			{!isManager && (
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<DialogContentText>
						The expense will be added on the the total salary for the job to
						account for any personal expenses you may have.
					</DialogContentText>
					<Box
						component="form"
						onSubmit={handleAddExpense}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							minWidth: "400px",
						}}
					>
						<TextField
							id="expense"
							required
							label="Expense"
							type="number"
							variant="outlined"
							onInput={(event) => setExpense(event.target.value)}
							sx={{ mt: 5, width: "100%" }}
						/>
						<TextField
							id="description"
							label="Add Description"
							type="text"
							variant="outlined"
							onInput={(event) => setDescription(event.target.value)}
							sx={{ mt: 3, mb: 2, width: "100%" }}
						/>
						<DialogActions>
							<Button type="submit">Add Expense</Button>
						</DialogActions>
					</Box>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default ChangeJobDialog;
