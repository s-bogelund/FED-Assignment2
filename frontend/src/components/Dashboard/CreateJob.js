import {
	Autocomplete,
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@mui/material";
import { containerStyle } from "../styling";
import { seedUsers } from "../../data/seeds";
import { createJob } from "../../data/jobFetching";
import React, { useEffect, useState } from "react";
import { readUsers, updateLocalJobs } from "../../data/handleLocalStorage";

const CreateJob = (props) => {
	const [newJob, setNewJob] = useState({
		customer: "",
		startDate: "",
		days: "",
		location: "",
		comments: "",
	});

	const handleJobSubmit = async (event) => {
		event.preventDefault();
		const success = await createJob(newJob);
		if (success) {
			updateLocalJobs(newJob);
		}

		props.onNewJob(newJob);
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
				<Typography variant="h5">Add New Job</Typography>
				<Box sx={{ my: 1 }}>
					<TextField
						onInput={(event) =>
							setNewJob({ ...newJob, customer: event.target.value })
						}
						fullWidth
						margin="normal"
						required
						value={newJob.customer}
						id="customer"
						label="Customer"
						name="customer"
					/>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<TextField
							onChange={(event) => {
								setNewJob({ ...newJob, startDate: event.target.value });
							}}
							sx={{ width: "48%" }}
							value={newJob.startDate}
							type="date"
							margin="normal"
							required
							label="Start Date"
							InputLabelProps={{ shrink: true, required: true }}
							id="startDate"
							name="startDate"
						/>
						<TextField
							onInput={(event) =>
								setNewJob({ ...newJob, days: event.target.value })
							}
							sx={{ maxWidth: "48%" }}
							type="number"
							margin="normal"
							value={newJob.days}
							required
							id="days"
							label="Number of Days"
							name="days"
						/>
					</Box>
					<TextField
						fullWidth
						onInput={(event) =>
							setNewJob({ ...newJob, location: event.target.value })
						}
						type="text"
						margin="normal"
						value={newJob.location}
						required
						id="location"
						label="Location"
						name="location"
					/>
					<TextField
						fullWidth
						onInput={(event) =>
							setNewJob({ ...newJob, comments: event.target.value })
						}
						type="text"
						margin="normal"
						value={newJob.comments}
						required
						id="comments"
						label="Add any comments"
						name="comments"
					/>
					{/* <Autocomplete
						multiple
						disableCloseOnSelect
						onChange={handleModelSelected}
						value={chosenModels}
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
					/> */}
				</Box>
				<Button type="submit" variant="contained">
					<Typography variant="button">Create Job</Typography>
				</Button>
			</Box>
		</Container>
	);
};

export default CreateJob;
