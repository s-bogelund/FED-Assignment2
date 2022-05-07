import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
} from "@mui/material";
import React from "react";

const AddModelDialog = (props) => {
	const handleModelSelected = (event) => {
		props.onModelSelected(event.target.id);
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
			<DialogTitle>Add Model</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Select the model you want to add to the job:
				</DialogContentText>
				<List>{modelList}</List>
			</DialogContent>
		</Dialog>
	);
};

export default AddModelDialog;
