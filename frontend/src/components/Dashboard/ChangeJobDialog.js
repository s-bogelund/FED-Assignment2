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
import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const ChangeJobDialog = (props) => {
	const [expense, setExpense] = useState(0);
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;

	const handleModelSelected = (event) => {
		props.onModelSelected(event.target.id);
	};

	const handleAddExpense = () => {
		props.onAddExpense(expense);
	};

	const modelList = props.models.map((model) => {
		return (
			<ListItem button onClick={handleModelSelected} key={model} id={model}>
				{model}
			</ListItem>
		);
	});

	console.log("dialog props: ", props);

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
			{isManager && (
				<DialogContent>
					<DialogContentText>
						Select the model you want to add to the job:
					</DialogContentText>
					<List>{modelList}</List>
				</DialogContent>
			)}
			{!isManager && (
				<DialogContent>
					<DialogContentText>
						The expense will be added on the the total salary for the job to
						account for any personal expenses you may have.
					</DialogContentText>
					<TextField
						id="expense"
						label="Expense"
						type="number"
						variant="outlined"
						onInput={(event) => setExpense(event.target.value)}
						sx={{ mt: 5 }}
					/>
					<DialogActions>
						<Button onClick={handleAddExpense}>Add Expense</Button>
					</DialogActions>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default ChangeJobDialog;
