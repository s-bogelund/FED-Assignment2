import {
	Autocomplete,
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@mui/material";
import { containerStyle } from "../styling";
import { seedModels } from "../../data/seeds";
import React, { useEffect, useState } from "react";

const CreateJob = (props) => {
	const [modelOptions, setModelOptions] = useState(seedModels);
	const [company, setCompany] = useState("");
	const [salary, setSalary] = useState("");
	const [chosenModels, setChosenModels] = useState([]);

	const handleJobSubmit = (event) => {
		event.preventDefault();
		props.onNewJob(company, salary, chosenModels);
	};

	const handleModelSelected = (event, value) => {
		// console.log("handleModelSelected called with value: ", value);
		setChosenModels(value);
	};

	return (
		<Container maxWidth="xs" sx={{ ...containerStyle }}>
			<Box
				component="form"
				onSubmit={handleJobSubmit}
				sx={{
					my: 2,
					mx: 2,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Typography variant="h5">Create New Job</Typography>
				<Box sx={{ my: 1 }}>
					<TextField
						onInput={(event) => setCompany(event.target.value)}
						fullWidth
						margin="normal"
						required
						id="company"
						label="Company"
						name="company"
					/>
					<TextField
						fullWidth
						onInput={(event) => setSalary(event.target.value)}
						type="number"
						margin="normal"
						required
						id="salary"
						label="Salary"
						name="salary"
					/>
					<Autocomplete
						multiple
						disableCloseOnSelect
						onChange={handleModelSelected}
						id="models"
						options={modelOptions}
						getOptionLabel={(option) => option.name}
						renderInput={(params) => (
							<TextField
								{...params}
								name="models"
								margin="normal"
								label="Select Models"
								placeholder="Choose Models"
							/>
						)}
					/>
				</Box>
				<Button type="submit" variant="contained">
					<Typography variant="button">Create Job</Typography>
				</Button>
			</Box>
		</Container>
	);
};

export default CreateJob;
