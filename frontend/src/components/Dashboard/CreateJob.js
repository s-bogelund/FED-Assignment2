import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

const CreateJob = () => {
	const handleJobSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			title: data.get("jobName"),
			company: data.get("company"),
			salary: data.get("salary"),
			description: data.get("jobDescription"),
		});
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				display: "flex",
				margin: 6,
				py: 1,
				border: "1px solid primary-dark",
				borderRadius: 4,
				boxShadow: "0 0 12px rgba(160, 160, 160, 0.6)",
				backgroundColor: "rgba(255, 255, 255, 0.15)",
			}}
		>
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
						autoFocus
						fullWidth
						margin="normal"
						required
						id="jobName"
						label="Job Name"
						name="jobName"
					/>
					<TextField
						fullWidth
						margin="normal"
						required
						id="company"
						label="Company"
						name="company"
					/>
					<TextField
						fullWidth
						type="number"
						margin="normal"
						required
						id="salary"
						label="Salary"
						name="salary"
					/>
					<TextField
						fullWidth
						multiline
						rows="3"
						margin="normal"
						required
						id="jobDescription"
						label="Job description"
						name="jobDescription"
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
